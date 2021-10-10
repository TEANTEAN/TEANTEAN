import NextLink from "next/link";
import Button from "@material-ui/core/Button";
import { useRouter } from "next/router";

const secondId1 = "555555555";
const secondIdLabel1 = "Double Nested Dynamic Route (55555555)";

const secondId2 = "aaaaaaaaaa";
const secondIdLabel2 = "Double Nested Dynamic Route (aaaaaaaa)";

/* eslint-disable */
const TestCrumbs = () => {
  const router = useRouter();
  return (
    <>
      <NextLink
        href={{
          pathname: "/admin/breadcrumbs/[account_id]/[second_id]",
          query: {
            account_id: router.query["account_id"],
            "account_id--label": router.query["account_id--label"],
            second_id: secondId1,
            "second_id--label": secondIdLabel1,
          },
        }}
        as={`/admin/breadcrumbs/${router.query["account_id"]}/${secondId1}?account_id--label=${router.query["account_id--label"]}&second_id--label=${secondIdLabel1}`}
        passHref
      >
        <Button>Go tonested dynamic page (5555555)</Button>
      </NextLink>

      <NextLink
        href={{
          pathname: "/admin/breadcrumbs/[account_id]/[second_id]",
          query: {
            account_id: router.query["account_id"],
            "account_id--label": router.query["account_id--label"],
            second_id: secondId2,
            "second_id--label": secondIdLabel2,
          },
        }}
        as={`/admin/breadcrumbs/${router.query["account_id"]}/${secondId2}?account_id--label=${router.query["account_id--label"]}&second_id--label=${secondIdLabel2}`}
        passHref
      >
        <Button>Go to nested dynamic page (aaaaaaaaa)</Button>
      </NextLink>
    </>
  );
};

export default TestCrumbs;
