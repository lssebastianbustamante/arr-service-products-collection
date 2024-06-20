export async function validate(ctx: Context, next: () => Promise<any>) {
  try {
    const {
      clients: { apps }
    } = ctx

    const appId = process.env.VTEX_APP_ID ? process.env.VTEX_APP_ID : ''

    const {collectionId,sectionSliderGiftBag, titleSliderGiftBag } = await apps.getAppSettings(appId)

    if(!collectionId) {
      ctx.status = 400
      ctx.body = 'Falta ID Collection'
    }

    ctx.state.collectionId = parseInt(collectionId as string, 10)
    ctx.state.sectionSliderGiftBag = sectionSliderGiftBag
    ctx.state.titleSliderGiftBag = titleSliderGiftBag

    ctx.status = 200

    await next();

  } catch (error) {
    ctx.status = 500
    ctx.body = 'Fallo Validate'
  }
}
