This is a [Next.js](https://nextjs.org/) project that manage the issues in this repository.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Second, create a `.env.local` file in the root directory and add the following environment variables:

```bash
NEXT_PUBLIC_GITHUB_CLIENTID = 71a9fc5576675af39a30
GITHUB_CLIENT_SECRET = 12c7a461734220e9723f224e55ace86306d40b43
ADMIN_ACCESS_TOKEN = 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
```


Third, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Architecture

### Pages

#### SignUp
The SignUp page is the first page that the user sees. 
The user is redirected to the GitHub OAuth page to authenticate.
 After the user is authenticated, the user is redirected to the redirect page.

#### Redirect
The Redirect page is the page that the user is redirected to after the user is authenticated.
This Page is used to get the access token from the GitHub OAuth page and save it in the localStorage.

#### Issue
The Issue page is the page that the user sees after the user is authenticated.
This page is used to display the issues in the repository.
User can create, edit, and delete the issues.
But the user can only edit and delete the issues that the user created.

#### Issue/[id]
The Issue/[id] page is the page that the user sees after the user clicks the edit button of the issue.
This page is used to display the issue details of the issue.
User can edit the issue details.

#### Issue/newIssue
The Issue/newIssue page is the page that the user sees after the user clicks the add new issue button from Issue Page.
This page is used to create the new issue.

### Components

#### Navbar
The Navbar component is used to display the navbar in many pages.

#### IssueCard
The IssueCard component is used to display the issue details in the Issue page.

#### Dropdown
The Dropdown component is used to display the dropdown menu in IssueCard.

#### Label
The Label component is used to display the label of the issue, and also can be used to switch the label.

#### Alert
The Alert component is used to display the alert message in many places.

#### Button, Card
The Button and Card components are used to display the button and card in many places.

### Config
The config folder is used to store the configuration of the project.
And some of the configuration is used to store the environment variables.

### Hooks
The hooks folder is used to store the custom hooks.

#### useIssue
The useIssue hook is used to get the issues from the GitHub API.

#### useAccessToken
The useAccessToken hook is used to get the access token from the localStorage.

#### useUser
The useUser hook is used to get the user information from the GitHub API.

### helpers
The helpers folder is used to store the helper functions.

#### githubClient
The githubClient is used to interact with the GitHub API.
User can create the issue, edit the issue, and delete the issue in this client function.

#### findOneIssue
The findOneIssue is used to get the certain issue details from the GitHub API.

#### handleLogin
This function is used to get user infomation from the GitHub API.

### Styles
The styles folder is used to store the styles of the project.

### Provider

#### UserProvider
The UserProvider is used to provide the user information to the children components.

#### AlertProvider
The AlertProvider is used to provide the alert message to the children components.

### Types
The types folder is used to store the types of the project.

#### Issue
The Issue type is used to store the issue details.
And the Label Type is used to stored the issue label types.

#### User
The User type is used to store the user information types.

