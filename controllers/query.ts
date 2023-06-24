

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$          Pagination                 $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

export const Paginate = async (model: any, obj: Object, page: number, limit: number, populate: any) => {
    if (page > 0 && page <= 1000000 && limit > 0 && limit <= 50) {
        const docs = await model.find(obj, populate)
            .limit(limit).skip((page - 1) * limit).sort({ createdAt: -1 })
        let nextPage = false, previousPage = true, totalDocs = 0, totalPages = 0, showingFrom = 1, showingTo = 0,
            currentPageNumber = page, nextPageNumber = -1, previousPageNumber = -1
        totalDocs = await model.find(obj).count(obj)
        if (docs.length == 0) {
            return docs
        }
        if (page != 1)
            showingFrom = (page * limit) - limit + 1
        totalPages = Math.ceil(totalDocs / limit)
        if (page * limit < totalDocs)
            nextPage = true
        if (page <= 1)
            previousPage = false
        if (nextPage)
            nextPageNumber = page + 1
        if (previousPage)
            previousPageNumber = page - 1
        if (!nextPage && totalDocs < page * limit)
            showingTo = totalDocs
        else
            showingTo = page * limit
        return {
            message: "Ok",
            docs, showingFrom, showingTo, currentPageNumber, previousPageNumber, nextPageNumber,
            limit, previousPage, nextPage, totalDocs, totalPages
        }
    }
    const docs = await model.find(obj, populate).sort({ createdAt: -1 })
    if (docs.length == 0)
        return docs
    return { message: "OK", docs }
}



