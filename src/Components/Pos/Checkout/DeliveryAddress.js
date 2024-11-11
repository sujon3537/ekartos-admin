import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Row } from "reactstrap";
import { RiAddLine, RiMapPinLine } from "react-icons/ri";
import { useTranslation } from "@/app/i18n/client";
import ShowModal from "../../../Elements/Alerts&Modals/Modal";
import request from "../../../Utils/AxiosUtils";
import { user } from "../../../Utils/AxiosUtils/API";
import CheckoutCard from "./common/CheckoutCard";
import CommonAddressForm from "./CommonAddressForm";
import ShowAddress from "./ShowAddress";
import I18NextContext from "@/Helper/I18NextContext";

const DeliveryAddress = ({ values, updateId, type, title }) => {
  const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
  const [modal, setModal] = useState(false);
  const [address, setAddress] = useState([])
  // Getting user by its id
  const { data, isLoading: load, refetch } = useQuery([user, updateId], () => request({ url: `${user}/${updateId}` }), { enabled: false, refetchOnWindowFocus: false, select: (data) => (data.data) });

  useEffect(() => {
    setAddress(data)
  }, [data])
  useEffect(() => {
    if (updateId) {
      refetch();
    }
  }, [updateId]);
  return (
    <>
      <CheckoutCard icon={<RiMapPinLine />}>
        <div className="checkout-title">
          <h4>{t(title)} {t("Address")}</h4>
          {values['consumer_id'] && <a className="d-flex align-items-center fw-bold" onClick={() => setModal(true)}><RiAddLine className="me-1"></RiAddLine>{t("AddNew")}</a>}
        </div>
        <div className="checkout-detail">
          {<>
            {values['consumer_id'] && data?.address?.length > 0 ?
              <Row className="g-4">
                {address?.address?.map((item, i) => (
                  <ShowAddress item={item} data={data} key={i} type={type} index={i} />
                ))}
              </Row>
              : <div className="empty-box">
                <h2>{t("NoaddressFound")}</h2>
              </div>}
          </>
          }
          <ShowModal modalAttr={{ className: "modal-lg" }} title={"AddShippingAddress"} open={modal} setModal={setModal}>
            <CommonAddressForm setModal={setModal} updateId={values["consumer_id"]} type={type} setAddress={setAddress} />
          </ShowModal>
        </div>
      </CheckoutCard>
    </>
  );
}

export default DeliveryAddress;
