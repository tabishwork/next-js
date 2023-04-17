const advanceResults= (model,populate) => async (req,res,next)=>{

    let query

    //Copy req.query
    const reqQuery={...req.query}
    

    // Fields to exclude 
    const removeFields =['select','sort','page','limit',]

    //Loop over removeFields and delete then from reqQuery
    removeFields.forEach(param => delete reqQuery[param])

    //Add keyword search to query object
    if (req.query.keyword) {
      const keyword = req.query.keyword;
      reqQuery.$or = [
        { name: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
        { title: { $regex: keyword, $options: 'i' } }
      ];
    }

    //Create query String
    let queryStr= JSON.stringify(reqQuery)
    
    //Create operators
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,
          match=> `$${match}`)

    //Finding resource
    query=model.find(JSON.parse(queryStr))


    //Select Fields 
    if(req.query.select){
      const fields =req.query.select.split(',').join(' ')
      query=query.select(fields)
      
    }
   

    //Sort
    if(req.query.sort){
      const sortBy=req.query.sort.split(',').join(' ')
      query= query.sort(sortBy)
    }else{
      query=query.sort('-createdAt')
    }
 

    //Pagination
    const page= parseInt(req.query.page,10) || 1;

    const limit= parseInt(req.query.limit,10) || 4

    

    const startIndex= (page-1)*limit
    const endIndex= page*limit
    const total= await model.countDocuments()

    query=query.skip(startIndex).limit(limit)

    if(populate){
        query=query.populate(populate)
    }

    
    
    const results= await query
    
    //Pagination result
    const pagination ={}

    if(endIndex < total){
        pagination.next={
            page:page+1,
            limit
        }
    }

    if(startIndex>0){
        pagination.prev={
            page:page-1,
            limit
        }
    }

    res.advanceResults={
        success:true,
        count:results.length,
        total,
        pagination,
        data: results,

    }

    next()


}


module.exports= advanceResults