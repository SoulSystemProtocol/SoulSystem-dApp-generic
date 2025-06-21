# Product Requirements Document: OpenGraph to MongoDB Migration

## 1. Introduction

This document outlines the requirements and plan for migrating the application's backend data source from OpenGraph (The Graph) to MongoDB. The key objective is to provide an option to switch between The Graph and MongoDB as data sources, allowing for flexibility and future scalability.

## 2. Goals

*   Implement MongoDB as an alternative data source for all relevant data entities (Souls, Games, Claims/Tasks, Rules, Actions).
*   Maintain the existing functionality of querying and displaying data when using MongoDB.
*   Allow the application to switch between The Graph and MongoDB via a configuration setting.
*   Ensure production-quality code, including tests and documentation.

## 3. Scope

*   **In Scope:**
    *   MongoDB schema design.
    *   Development of a MongoDB Data Access Layer (DAL).
    *   Integration of the MongoDB DAL into server-side rendering logic.
    *   Integration of the MongoDB DAL into client-side data fetching logic (Contexts, Hooks).
    *   Configuration mechanism for data source switching.
    *   Unit and integration tests for the MongoDB implementation.
    *   Documentation for setup and architectural changes.
*   **Out of Scope (Initially, but desirable for full migration):**
    *   Full data migration scripts from The Graph to MongoDB (Strategy will be defined).

## 4. User Stories (Implicit)

*   As a developer, I want to be able to configure the application to use MongoDB as its primary data source so that I can leverage MongoDB's features.
*   As a developer, I want to be able to switch back to The Graph if needed during the transition period.
*   As a user, I should not notice any difference in application functionality or data presentation when the backend is switched to MongoDB (unless specific new features are added).

## 5. Proposed Plan & Progress Tracking

The migration will follow the detailed plan agreed upon, which includes the following major phases:

1.  **Project Setup & PRD Document:** - *Completed*
2.  **MongoDB Setup and Schema Design:** - *Completed*
3.  **Create MongoDB Data Access Layer (DAL):** - *Completed*
4.  **Integrate MongoDB DAL for Server-Side Rendering (SSR):** - *Completed*
5.  **Strategy for Client-Side Data Fetching with MongoDB:** - *Strategy Defined*
6.  **Implement Client-Side Data Fetching for MongoDB:** - *In Progress*
7.  **Address \`useSubgraph.ts\` (Deprecated Hook):**
8.  **Data Migration Strategy and Scripting (Optional but Recommended):**
9.  **Configuration for Switching Data Sources:**
10. **Testing:**
11. **Documentation Updates:**
12. **Review and Submission:**

Progress for each step will be updated in this document.

## 6. Design & Architecture

(Details to be added as each phase progresses, e.g., MongoDB schemas, DAL interface, data flow diagrams for the new source).

## 6.1. MongoDB Connection Strategy

The application will connect to MongoDB using a connection string provided via an environment variable, tentatively named \`MONGODB_URI\`.

## 6.2. MongoDB Schema Design

The following conceptual schemas are proposed for the MongoDB collections. These are designed to mirror the existing data structures retrieved from The Graph to minimize frontend modifications. Timestamps (\`createdAt\`, \`updatedAt\`) will be included for all collections.

### 1. \`souls\` Collection

*   \`_id\`: ObjectId (MongoDB default)
*   \`soulId\`: String (corresponds to The Graph \`id\`)
*   \`owner\`: String (address)
*   \`type\`: String (e.g., "", "GAME", "TASK")
*   \`role\`: String (optional)
*   \`uri\`: String (link to metadata JSON)
*   \`metadata\`: Object (parsed JSON from \`uri\`)
    *   \`name\`: String
    *   \`image\`: String
    *   \`attributes\`: Array of objects (\`{trait_type: String, value: String, display_type: String}\`)
*   \`uriImage\`: String (direct image URL)
*   \`name\`: String (derived from metadata)
*   \`tags\`: Array of Strings
*   \`attrs\`: Array of objects (e.g., \`{id: String, role: String, bEnd: Date}\`)
*   \`participantGame\`: Array of objects (\`{ id: String, roles: [String] }\`)
*   \`participantProc\`: Array of objects (\`{ id: String, roles: [String] }\`)
*   \`createdAt\`: Date
*   \`updatedAt\`: Date

### 2. \`games\` Collection

*   \`_id\`: ObjectId
*   \`gameId\`: String (corresponds to The Graph \`id\`)
*   \`name\`: String
*   \`type\`: String
*   \`role\`: String
*   \`hub\`: String (address of the hub contract, optional)
*   \`roles\`: Array of objects (\`{ roleId: String, name: String, souls: [String], soulsCount: Number }\`)
*   \`nominations\`: Array of objects (\`{ nominationId: String, createdDate: Date, nominator: String (soulId), nominated: String (soulId), uri: String }\`)
*   \`posts\`: Array of objects
    *   \`postId\`: String
    *   \`createdDate\`: Date
    *   \`entityRole\`: String
    *   \`authorSoulId\`: String (soulId of the author)
    *   \`uri\`: String
    *   \`metadata\`: Object
*   \`createdAt\`: Date
*   \`updatedAt\`: Date

### 3. \`claims\` Collection (Tasks/Procedures)

*   \`_id\`: ObjectId
*   \`claimId\`: String (corresponds to The Graph \`id\`)
*   \`name\`: String
*   \`stage\`: String (or Number)
*   \`type\`: String
*   \`gameId\`: String (reference to \`games.gameId\`)
*   \`roles\`: Array of objects (similar to \`games.roles\`)
*   \`nominations\`: Array of objects (similar to \`games.nominations\`)
*   \`posts\`: Array of objects (similar to \`games.posts\`)
*   \`createdAt\`: Date
*   \`updatedAt\`: Date

### 4. \`rules\` Collection

*   \`_id\`: ObjectId
*   \`ruleEntityId\`: String (corresponds to The Graph \`id\` of GameRule entity)
*   \`gameId\`: String (reference to \`games.gameId\`)
*   \`aboutActionId\`: String (reference to an \`actions.actionId\` or GUID, corresponds to 'about' field in Graph)
*   \`ruleId\`: String (corresponds to \`ruleId\` field in Graph if different from entity id)
*   \`affected\`: String
*   \`uri\`: String
*   \`metadata\`: Object (parsed JSON from \`uri\`)
*   \`negation\`: Boolean
*   \`confirmationRuling\`: String (or boolean)
*   \`confirmationEvidence\`: Boolean
*   \`confirmationWitness\`: Number
*   \`effects\`: Array of objects (\`{ name: String, direction: String, value: Number }\`)
*   \`isPositive\`: Boolean
*   \`isDisabled\`: Boolean
*   \`createdAt\`: Date
*   \`updatedAt\`: Date

### 5. \`actions\` Collection

*   \`_id\`: ObjectId
*   \`actionId\`: String (corresponds to The Graph \`id\`, a GUID)
*   \`subject\`: String
*   \`verb\`: String
*   \`object\`: String
*   \`tool\`: String
*   \`uri\`: String
*   \`metadata\`: Object (parsed JSON from \`uri\`)
*   \`createdAt\`: Date
*   \`updatedAt\`: Date

## 6.3. MongoDB Data Access Layer (DAL) Structure

A new directory \`db/mongodb/\` has been created to house the Data Access Layer for MongoDB.

*   **\`db/mongodb/connection.ts\`**: Handles the MongoDB connection logic, using the \`MONGODB_URI\` environment variable. It exports a \`connectToDatabase\` function to get a DB instance and \`closeDatabaseConnection\` for graceful shutdowns.
*   **\`db/mongodb/souls.ts\`**: Initial implementation for CRUD operations related to the 'souls' collection. It includes:
    *   \`SoulDocument\` interface.
    *   \`findSouls(params)\`: Fetches multiple souls with filtering (by IDs, owners, type) and pagination (first, skip).
    *   \`getSoulBySoulId(soulId)\`: Fetches a single soul by its unique \`soulId\`.
    *   \`getSoulsByOwner(ownerAddress)\`: Fetches souls by owner's address.
    *   \`createSoul(soulData, soulId)\`: Creates a new soul document.
    *   \`updateSoul(soulId, updates)\`: Updates an existing soul document.
    *   \`deleteSoul(soulId)\`: Deletes a soul document.
*   **Placeholder files created for other entities:**
    *   \`db/mongodb/games.ts\`
    *   \`db/mongodb/claims.ts\`
    *   \`db/mongodb/rules.ts\`
    *   \`db/mongodb/actions.ts\`

These files will be populated with specific DAL functions for each entity in subsequent tasks.
The DAL is designed to be used by both server-side rendering logic and client-side data fetching mechanisms.

## 6.4. SSR Integration for MongoDB DAL

The MongoDB DAL has been integrated into the Server-Side Rendering (SSR) process for the main entity page \`pages/soul/[slug].tsx\`.

*   The \`getServerSideProps\` function in \`pages/soul/[slug].tsx\` was updated to:
    *   Read a \`DATA_SOURCE\` environment variable (defaulting to 'thegraph').
    *   If \`DATA_SOURCE\` is 'mongodb', it now calls the corresponding data fetching functions from the MongoDB DAL (\`db/mongodb/souls.ts\`).
    *   If \`DATA_SOURCE\` is 'thegraph' or not set, it uses the existing Subgraph/GraphiQL query functions.
*   Basic console logging was added to indicate which data source is being used.
*   The integration currently assumes that the \`normalizeGraphEntity\` function and page components can handle data from the MongoDB DAL.
*   The file \`helpers/metadata.ts\` (containing \`normalizeGraphEntity\`) has been captured to \`metadata_content.txt\` for review.

## 6.5. Strategy for Client-Side Data Fetching with MongoDB

The application primarily uses Apollo Client (\`useQuery\` hook within custom React hooks like \`useGameByHash\`, \`useSoulById\`, etc.) for client-side data fetching. To integrate MongoDB while minimizing disruption, the following strategy has been chosen:

**Chosen Strategy: Option A - Custom Apollo Link with DAL-side Population**

This approach involves creating a custom Apollo Link that will intelligently route GraphQL queries to either the existing Subgraph endpoint or the new MongoDB Data Access Layer (DAL), based on the \`DATA_SOURCE\` environment variable.

**1. Apollo Client Configuration (\`pages/_app.tsx\`):**
    *   The existing \`ApolloClient\` instance will be modified to use a new custom link.
    *   This custom link will use \`ApolloLink.split\` or similar logic:
        *   If \`DATA_SOURCE\` is \`mongodb\`: Queries will be directed to a "MongoDBLink" (a custom ApolloLink).
        *   If \`DATA_SOURCE\` is \`thegraph\` (or default): Queries will be directed to the standard HTTP link pointing to the Subgraph API.

**2. MongoDBLink (Custom ApolloLink):**
    *   This link will be responsible for handling requests when MongoDB is the active data source.
    *   **Operation:**
        1.  It will receive the GraphQL query (AST) and variables from Apollo Client.
        2.  It will parse the query to determine the main entity being fetched (e.g., "game", "soul") and the requested fields.
        3.  It will identify if any "populate" flags are needed based on the requested fields (e.g., if \`posts.author\` is requested in a game query, a flag like \`{ populatePostAuthors: true }\` would be set).
        4.  It will call the appropriate function in the MongoDB DAL (e.g., \`dal.games.getGameById(id, { populatePostAuthors: true })\`).
        5.  It will receive the data from the DAL (which would have handled fetching the primary entity and any specified related data).
        6.  It will then shape this data into a GraphQL-like response structure (e.g., \`{ data: { game: {...} } }\`) and return it as an \`Observable\`.
    *   **Field Pruning:** The DAL will be designed to return documents with populated fields. The standard Apollo Client cache and \`useQuery\` hook will handle pruning down to the exact fields requested by a specific component's query. The MongoDBLink's main job is to get the right data from the DAL, not necessarily to perfectly prune it to the query shape (though it could).

**3. Augmenting MongoDB DAL Functions:**
    *   DAL functions like \`db/mongodb/games.ts::getGameByGameId(id, options)\` will be updated.
    *   The \`options\` object will accept parameters to control population of related data (e.g., \`{ populateRoles: true, populateNominations: true, populatePosts: { populateAuthor: true } }\`).
    *   The DAL functions will contain the logic to perform these additional lookups if the flags are set (e.g., fetching a game, then iterating its posts to fetch author souls if \`populatePosts.populateAuthor\` is true).

**4. Benefits:**
    *   Reuses the existing \`useQuery\` hooks and Apollo Client infrastructure, minimizing changes in components and custom hooks like \`useGameByHash\`.
    *   Centralizes MongoDB query logic and data shaping within the DAL and the MongoDBLink.
    *   Provides a consistent data fetching API to the rest of the application.

**5. Fallback/Alternative:**
    *   If specific queries prove too complex to implement via this custom link and DAL population strategy, those individual hooks can be switched to a direct DAL-call approach (Option B) as exceptions.

This strategy aims for a balance between reusing existing patterns and managing the complexity of translating GraphQL requests to MongoDB operations.

## 6.6. Implementation of Client-Side Data Fetching for MongoDB

The client-side data fetching strategy using a custom Apollo Link has been implemented:

*   **DAL Augmentation:**
    *   The \`db/mongodb/games.ts\` Data Access Layer module has been updated. The \`getGameByGameId\` function now accepts an options object to allow population of related data, specifically implemented for populating \`posts.author\` by fetching the corresponding Soul document.
*   **MongoDBLink Created (\`apollo/MongoDBLink.ts\`):**
    *   A new custom Apollo Link, \`MongoDBLink\`, has been created.
    *   This link intercepts GraphQL operations. Based on the \`operationName\`, it calls the relevant MongoDB DAL function (e.g., \`getGameByGameId\` for \`GameByHashQuery\`, \`getSoulBySoulId\` for \`SoulByIdQuery\`).
    *   It passes necessary population options to the DAL based on the query's typical needs.
    *   The DAL's response is then shaped into a GraphQL-like structure (e.g., \`{ data: { game: ... } }\`) and returned.
    *   Currently, it supports \`GameByHashQuery\`, \`SoulByIdQuery\`, and \`SoulByHashQuery\`.
*   **Apollo Client Configuration Updated (\`pages/_app.tsx\`):**
    *   The Apollo Client setup in \`pages/_app.tsx\` has been modified:
        *   It now uses \`ApolloLink.split\` to conditionally route requests.
        *   If the environment variable \`NEXT_PUBLIC_DATA_SOURCE\` (Note: using this one as it's client accessible, vs DATA_SOURCE for server-side) is set to 'mongodb', requests go through \`MongoDBLink\`.
        *   Otherwise, requests go to the standard \`httpLink\` for The Graph.
*   **Environment Variable for Client-Side:** The implementation assumes an environment variable like \`NEXT_PUBLIC_DATA_SOURCE\` will be used to control the switch on the client-side, as regular \`process.env.DATA_SOURCE\` is not available in client-side Next.js code by default. This needs to be aligned with the server-side \`DATA_SOURCE\` variable.

This setup allows existing \`useQuery\` hooks (like \`useGameByHash\`) to work with either MongoDB or The Graph based on the environment configuration.

## 7. Risks and Mitigation

*   **Risk:** Complexity in adapting GraphQL-centric client code (Apollo Client) to a non-GraphQL backend (MongoDB).
    *   **Mitigation:** Thorough investigation of Apollo Link or alternative hook strategies.
*   **Risk:** Ensuring data consistency and structure parity between The Graph and MongoDB.
    *   **Mitigation:** Careful schema design and data transformation logic.
*   **Risk:** Performance differences between The Graph and MongoDB.
    *   **Mitigation:** Query optimization and testing.

## 8. Future Considerations

*   Full data migration and decommissioning of The Graph dependency.
*   Leveraging MongoDB-specific features for new functionalities.
