export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const ProjectPartsFragmentDoc = gql`
    fragment ProjectParts on Project {
  __typename
  expId
  title_zh
  title_en
  status
  description_zh
  description_en
  href
}
    `;
export const LogPartsFragmentDoc = gql`
    fragment LogParts on Log {
  __typename
  dateLabel
  fullDate
  title_zh
  title_en
  description_zh
  description_en
  details {
    __typename
    text_zh
    text_en
  }
}
    `;
export const PageContentPartsFragmentDoc = gql`
    fragment PageContentParts on PageContent {
  __typename
  pageId
  sections {
    __typename
    sectionId
    label_zh
    label_en
    title_zh
    title_en
    subtitle_zh
    subtitle_en
    body_zh
    body_en
  }
}
    `;
export const ProjectDocument = gql`
    query project($relativePath: String!) {
  project(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ProjectParts
  }
}
    ${ProjectPartsFragmentDoc}`;
export const ProjectConnectionDocument = gql`
    query projectConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ProjectFilter) {
  projectConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ProjectParts
      }
    }
  }
}
    ${ProjectPartsFragmentDoc}`;
export const LogDocument = gql`
    query log($relativePath: String!) {
  log(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...LogParts
  }
}
    ${LogPartsFragmentDoc}`;
export const LogConnectionDocument = gql`
    query logConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: LogFilter) {
  logConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...LogParts
      }
    }
  }
}
    ${LogPartsFragmentDoc}`;
export const PageContentDocument = gql`
    query pageContent($relativePath: String!) {
  pageContent(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PageContentParts
  }
}
    ${PageContentPartsFragmentDoc}`;
export const PageContentConnectionDocument = gql`
    query pageContentConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PageContentFilter) {
  pageContentConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PageContentParts
      }
    }
  }
}
    ${PageContentPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    project(variables, options) {
      return requester(ProjectDocument, variables, options);
    },
    projectConnection(variables, options) {
      return requester(ProjectConnectionDocument, variables, options);
    },
    log(variables, options) {
      return requester(LogDocument, variables, options);
    },
    logConnection(variables, options) {
      return requester(LogConnectionDocument, variables, options);
    },
    pageContent(variables, options) {
      return requester(PageContentDocument, variables, options);
    },
    pageContentConnection(variables, options) {
      return requester(PageContentConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/2.4/content/ace6c9f9-627e-4f91-83e2-e19bad791f04/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
