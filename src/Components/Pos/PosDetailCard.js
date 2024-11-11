import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { CardBody } from "reactstrap";
import Btn from "../../Elements/Buttons/Btn";
import SettingContext from "../../Helper/SettingContext";
import IncDec from "./IncDec";
import { useTranslation } from "@/app/i18n/client";
import { placeHolderImage } from "../../Data/CommonPath";
import CreateCartContext from "../../Helper/CartContext";
import I18NextContext from "@/Helper/I18NextContext";
import { usePathname, useRouter } from "next/navigation";

const PosDetailCard = ({ values, setFieldValue, initValues }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const router = useRouter();
  const pathname = usePathname();
  const { convertCurrency } = useContext(SettingContext)
  const { cartState } = useContext(CreateCartContext);
  useEffect(() => {
    if (cartState?.length > 0) {
      setFieldValue('products', ...initValues?.products.map((elem) => {
        return cartState?.filter((val) => {
          return val.product_id !== elem.product_id ? elem : []
        })
      }))
    }
  }, [cartState])
  useEffect(() => {
    setFieldValue('products', initValues?.products)
    setFieldValue('total', initValues?.total)
  }, [initValues])
  return (
    <CardBody>
      <div className="title-header">
        <h5 className="fw-bold">{t("CartDetails")}</h5>
      </div>
      <div className="product-details">
        {!values['products']?.length ? (
          <>
            <div className="empty-cart">
              <Image src="/assets/svg/empty-cart.svg" className="img-fluid" alt="Empty Cart" height={150} width={150} />
              <h4>{t("Noitemsinacart")}</h4>
            </div>
          </>
        ) : (
          <>
            <ul className="cart-listing">
              {values['products']?.map((item, i) => (
                <li key={i}>
                  <Image src={item?.variation && item?.variation?.variation_image ? item?.variation?.variation_image?.original_url
                    : item?.product?.product_thumbnail ? item?.product?.product_thumbnail?.original_url
                      : placeHolderImage} className="img-fluid" alt={item?.product?.name || ''} width={70} height={70} />
                  <div className="cart-content">
                    <h4>{item?.variation ? item?.variation?.name : item?.product?.name}</h4>
                    <div>
                      <h5>
                        {item?.variation ? convertCurrency(item?.variation.sale_price) : convertCurrency(item?.product?.sale_price)}
                      </h5>
                      {pathname !== '/checkout' && <IncDec item={item} values={values} setFieldValue={setFieldValue} />}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <ul className={`summary-total`}>
              <>
                <li>
                  <h4>{t("Subtotal")}</h4>
                  <h4 className="price">{convertCurrency(values['total'])}</h4>
                </li>
                <li>
                  <h4>{t("Shipping")}</h4>
                  <h4 className="price">{t("Costatcheckout")}</h4>
                </li>
                <li>
                  <h4>{t("Tax")}</h4>
                  <h4 className="price">{t("Costatcheckout")}</h4>
                </li>
                <li className="list-total">
                  <h4>{t("Total")}</h4>
                  <h4 className="price">{convertCurrency(values['total'])}</h4>
                </li>
              </>
            </ul>
            {router.pathname !== '/checkout' && <Btn
              className="btn btn-animation payment-btn mt-4"
              onClick={() => {
                router.push(`/${i18Lang}/checkout`);
                setFieldValue("amount", values["products"].map((item) => item.subtotal).reduce((partialSum, a) => Number(partialSum) + Number(a), 0),
                );
              }}>
              {t("ProceedToCheckout")}
            </Btn>}
          </>
        )}

      </div>
    </CardBody>
  );
};

export default PosDetailCard;
