const { client } = require("../../utils/sanity");

module.exports = async function() {
    let query = `*[_type == "job" && "am" in publishTo]{ 
      ...,
      body{
          ...,
          content[]{
              ...,
              markDefs[] {
                ...,
                _type == "internalLink" => {
                  ...,
                  "slug": @.reference-> slug
                }
              }
          }
        } 
   }`
    let docs = await client.withConfig({
        token: process.env.SANITY_READ_TOKEN
    }).fetch(query).catch(err => console.error(err));
    return docs;
}