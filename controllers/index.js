var {Style, Product, Feature, Photo, Skus} = require("../DB/NoSQLSchema");


exports.retrieve = (page = 1, count = 5) => {

//NOTE NEED TO USE .skip!!!!!!!! for pages
  console.log(page, count)
  // return Product.find({}).sort('id').limit(count)
  // .exec();

  return Product.aggregate()
    .sort('id')
    .skip((page - 1) * count)
    .limit(count)
    .project('-_id id name slogan description category default_price related')
    .exec();
};

exports.retrieveOneById = (productid) => {
  return Product.findOne({id: productid})
    .select('-_id id name slogan description category default_price features')
    .exec();
}

exports.retrieveStyles = (productid) => {
  return Style.find({id: productid})
    .select('-_id id name slogan description category default_price features')
    .sort('id')
    .exec();
}

exports.retrieveRelated = (productid) => {
  console.log("running related!")
  return Product.aggregate()
  .match({id: productid})
  .project('-_id related')
  .exec();
}