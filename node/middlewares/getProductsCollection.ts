/* eslint-disable prettier/prettier */
/* eslint-disable no-await-in-loop */
export async function getProductsCollection(
    ctx: Context,
  ) {
    const {
      clients: { collectionClient }
    } = ctx
    try {
        const titleSlider = ctx.state.titleSliderGiftBag
        const sectionSliderGiftBag = ctx.state.sectionSliderGiftBag
        const allProducts = []
        let currentPage = 1
        let totalPage = 0
        const collectionIdNew = ctx.state.collectionId
        const res = await collectionClient.getProductFromCollection(
            collectionIdNew,
            currentPage.toString(),
            '50'
      )

        totalPage = res.TotalPage
    do {
        const res2 = await collectionClient.getProductFromCollection(
          collectionIdNew,
          currentPage.toString(),
          '50'
        )
        const arr = []
        // Iterar sobre los productos y agregar solo ProductId y ProductName al array
        for (const product of res2.Data) {
          const { ProductId } = product
          arr.push(ProductId)
        }
        allProducts.push(...arr)
        currentPage++
      } while (currentPage <= totalPage)
      
      ctx.status = 200
      ctx.body = {
        "Section": sectionSliderGiftBag,
        "Title": titleSlider,
        "Products": allProducts,
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = 'Fallo getNewCollection'
    }
  }
  