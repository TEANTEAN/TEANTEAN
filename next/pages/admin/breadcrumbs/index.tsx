import React from "react";
import NextLink from "next/link";
import Button from "@material-ui/core/Button";

const accountId = 12345;
const accountIdLabel = "Nested Dynamic Route";

const BreadcrumbDemo = () => (
  <NextLink
    href={{
      pathname: "/admin/breadcrumbs/[account_id]",
      query: { accountId: 21345, "account_id--label": accountIdLabel },
    }}
    as={`/admin/breadcrumbs/${accountId}?account_id--label=${accountIdLabel}`}
    passHref
  >
    <Button>go to dynamic page</Button>
  </NextLink>
);

export default BreadcrumbDemo;
