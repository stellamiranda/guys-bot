require('dotenv').config()

const { createEventAdapter } = require('@slack/events-api')
const { WebClient } = require('@slack/web-api')
const web = new WebClient(process.env.SLACK_TOKEN)
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET)
const port = process.env.PORT || 3000

slackEvents.on('message', (event) => {
  if (
    Object.prototype.hasOwnProperty.call(event, 'text') &&
    event.text.toLowerCase().includes('guys')
  ) {
    (async () => {
      const messageBody =
        process.env.GUYS_MESSAGE ||
        "Did you know the term 'guys' would assume everyone you're "+
        "talking to identifies with the male-gender? You can consider " +
        "using _y'all_, _crew_, _people_, _friends_, _everyone_ or _team_."

      const infoLink =
        process.env.GUYS_INFO_LINK ||
        'https://dev.to/kmelve/the-problem-with-you-guys-51h7'

      await web.chat.postEphemeral({
        channel: event.channel,
        user: event.user,
        text: messageBody + ` (<${infoLink}|What\'s this then?>).`
      })
    })()
  }

  if (
    Object.prototype.hasOwnProperty.call(event, 'text') &&
    event.text.toLowerCase().includes('tribe')
  ) {
    (async () => {
      const messageBody =
        process.env.GUYS_MESSAGE ||
        "Did you know European colonists used this term synonymously "+
        "with ‘savage’ or ‘primitive’? At Unbounce, we've transitioned "+
        "to the term 'team'."
      const infoLink =
        process.env.GUYS_INFO_LINK ||
        'https://dev.to/kmelve/the-problem-with-you-guys-51h7'

      await web.chat.postEphemeral({
        channel: event.channel,
        user: event.user,
        text: messageBody + ` (<${infoLink}|What\'s this then?>).`
      })
    })()
  }
})

slackEvents.on('error', console.error)

slackEvents.start(port).then(() => {
  console.log(`server listening on port ${port}`)
})
