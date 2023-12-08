# Momentic Run Tests GitHub Action

## Prerequisites

### Create a Momentic API key

For this action to communicate securely with Sentry, you'll need to create a new
API key. In Momentic, navigate to: API key.

Give your new API key a name (for example, "GitHub Action Run Tests).

![View of internal integration permissions.](images/internal-integration-permissions.png)

Click Create at the bottom of the dialog and copy your token, which you’ll use
as your `MOMENTIC_API_KEY`. We recommend you store this as an
[encrypted secret](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions).

## Usage

Adding the following to your workflow will create a new Sentry release and tell
Sentry that you are deploying to the `production` environment.

```yaml
- uses: actions/checkout@v3
  with:
    fetch-depth: 0

- name: Run tests using Momentic
  uses: momentic-ai/run-tests@v1
  env:
    MOMENTIC_API_KEY: ${{ secrets.MOMENTIC_API_KEY }}
  with:
    test-id: 8f20cad6-2fd5-4019-bcbc-26fb617f36c5
```

### Inputs

#### Environment Variables

| name               | description                                       | default |
| ------------------ | ------------------------------------------------- | ------- |
| `MOMENTIC_API_KEY` | **[Required]** Authentication token for Momentic. | -       |

#### Parameters

| name      | description                    | default |
| --------- | ------------------------------ | ------- |
| `test-id` | ID of the test you want to run |