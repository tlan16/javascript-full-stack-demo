import React from "react";
import LayoutContent from "@isomorphic/shared/isomorphic/components/utility/layoutContent";
import {LayoutContentWrapper} from "@isomorphic/shared/isomorphic/components/utility/layoutWrapper.style";
import CustomersTable from "./CustomersTable";

export default () => (
    <LayoutContentWrapper style={{height: '100vh'}}>
        <LayoutContent>
            <CustomersTable/>
        </LayoutContent>
    </LayoutContentWrapper>
)
