"use client";
import { useContext, useRef, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import TreeForm from "@/Components/category/TreeForm";
import CategoryForm from "@/Components/category/CategoryForm";
import TableTitle from "@/Components/Table/TableTitle";
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";

const CategoryCreate = () => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const refRefetch = useRef()
  return (
    <>
      <Row>
        <Col xl="4">
          <Card>
            <CardBody>
              <TableTitle moduleName="Category" type={'product'} onlyTitle={true} />
              <TreeForm type={"product"} ref={refRefetch} />
            </CardBody>
          </Card>
        </Col>
        <Col xl="8">
          <Card>
            <CardBody>
              <div className="title-header option-title">
                <h5>{t("AddCategory")}</h5>
              </div>
              <CategoryForm type={"product"} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CategoryCreate;
