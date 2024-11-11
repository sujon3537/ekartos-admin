import SimpleInputField from '../../InputFields/SimpleInputField';
import I18NextContext from "@/Helper/I18NextContext";
import { useTranslation } from "@/app/i18n/client";
import CheckBoxField from '../../InputFields/CheckBoxField';
import SearchableSelectInput from '../../InputFields/SearchableSelectInput';
import { useContext } from 'react';

const ProductListTab = ({ productData, setSearch }) => {
    const { i18Lang } = useContext(I18NextContext);
    const { t } = useTranslation(i18Lang, 'common');
    return (
        <>
            <SimpleInputField nameList={[
                { name: `[content][product_with_deals][products_list][title]`, placeholder: t("EnterTitle"), title: "Title" }
            ]} />
            <SearchableSelectInput
                nameList={
                    [{
                        name: 'productDealProductIds',
                        title: "Products",
                        inputprops: {
                            name: 'productDealProductIds',
                            id: 'productDealProductIds',
                            options: productData || [],
                            setsearch: setSearch,
                        }
                    },
                    ]}
            />
            <CheckBoxField name={`[content][product_with_deals][products_list][status]`} title="Status" />
        </>
    )
}

export default ProductListTab