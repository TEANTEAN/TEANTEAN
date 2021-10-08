/* eslint-disable */
import * as React from "react";
import MuiBreadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Button, Typography } from "@material-ui/core";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

interface DynamicRouteLabels {
  [dynamicRoute: string]: string;
}

interface Crumb {
  route: string;
  label: string;
  query: {
    [key: string]: string;
  };
}

const Breadcrumbs = () => {
  const [breadcrumbs, setBreadcrumbs] = React.useState<Crumb[]>([]);

  const router = useRouter();

  console.log("router aspath: ", router.asPath);

  React.useEffect(() => {
    console.log("router query params inside useEffect: ", router.query);
    if (router) {
      const getBreadcrumbs = () => {
        const splitPath = router.asPath.split("/");
        const segmentsPath = splitPath.slice(2); // Remove empty string and /admin from route

        const splitRoute = router.route.split("/");
        const segmentsRoute = splitRoute.slice(2); // Remove empty string and /admin from route

        const dynamicRouteLabels: DynamicRouteLabels = {};

        const res = segmentsRoute.map((segment, index) => {
          let label;
          // It's a dynamic route, hence try to instead replace the label with a query parameter for human readability
          // and add to the current list of dynamic routes
          if (segment[0] === "[" && segment[segment.length - 1] === "]") {
            const queryParam = segmentsRoute[index].slice(1, -1);
            const queryParamLabel = queryParam + "--label";
            if (router.query[queryParamLabel]) {
              label = router.query[queryParamLabel];
              dynamicRouteLabels[queryParamLabel] = label;
            } else if (router.query[queryParam]) {
              label = router.query[queryParam];
            }
          }
          if (!label) label = segment[0].toUpperCase() + segment.substring(1);
          return {
            route: `/admin/${segmentsPath.slice(0, index + 1).join("/")}`,
            label: label,
            query: { ...dynamicRouteLabels },
          };
        });
        return res;
      };
      const crumbs = getBreadcrumbs();
      setBreadcrumbs(crumbs);
    }
  }, [router.asPath]);

  return (
    <div role="presentation" onClick={handleClick}>
      <MuiBreadcrumbs aria-label="breadcrumb">
        {breadcrumbs.map((crumb, index) => {
          if (index === breadcrumbs.length - 1) {
            // The final crumb shouldn't be a link
            return (
              <Typography color="textPrimary" key={`${crumb.label}_${index}`}>
                {crumb.label}
              </Typography>
            );
          }
          return (
            <NextLink
              key={`${crumb.label}_${index}`}
              href={{
                pathname: crumb.route,
                query: crumb.query,
              }}
              passHref
            >
              <Link underline="hover" color="inherit">
                {crumb.label}
              </Link>
            </NextLink>
          );
        })}
      </MuiBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;
