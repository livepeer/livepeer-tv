## Livepeer TV

An open source decentralised event app built with Next.js and Livepeer Studio.

https://github.com/livepeer/livepeer-tv/assets/56798748/d1faed74-cdb5-4f1e-880f-3323bfea5fbe


It includes the following features:

- Fully customisated with live preview of the app through Contentful
- Each show can be configured as -
  - An pre-recorded video
  - A live interactive audio-video experience powered by Livepeer between host and guest
- Show moderation with host authentication
- Calendar invites to guest once the show is created
- Auto recording the live show and replace the live show with the recording once the show is over
- Low code, once deployed show content and guest can be all managed through Contentful

### Built With

- Language: Typescript
- Framework: Next.js
- Video Infrastructure: Livepeer
- CMS: Contentful
- Deployment: Multiple Options
- Authentication: Magic.Link

### Running Locally

Before running this app locally, you would need an account in following services

- Livepeer Studio
- Contentful
- Magic Link

Next, rename `.env.example` to `.env` and add your API keys into it

Then install the package and run the development server:

```
yarn install

yarn dev
```

### Deployment and Customisation

- Fork this repository and deploy it using Vercel, Netlify or any other platforms
- Add your API keys to "Environment variable“ while deploying the app
- Once the app is deployed, go to `your-domain.com/api/setup`, this will import all the content models and webhooks into your Contentful dashboard
- Once the import is finished, you can go to your Contentful dashboard, and add a Configuration content
- Fill the information and save it
- That is it! you can now add shows, guests and admins through Contentful
