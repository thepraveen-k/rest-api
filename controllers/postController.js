const Validator = require('fastest-validator')
const models = require('../models')


//@desc POST /posts

function save (req,res) {

    const post = {

        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
        userId: 1
    }

    // validate strating
      const schema = {

        title: {type:'string', optional:false, max:'100'},  //it defines optional for field is mandatory
        content: {type:'string', optional:false, max:'100'}, //length defines for the length the characters in the field
        categoryId: {type:'number', optional:false}
      }

      const v = new Validator();
      const validationResponse = v.validate(post, schema)

      if(validationResponse !== true){

        return res.status(400).json({
            
            message: 'Validation Failed!',
            errors: validationResponse
        })
      }
      //validate ending

    models.Post.create(post)
    .then((result) => {
        
        res.status(200).json({

            message: 'Post Created Successfully',
            post: result
        })
    }).catch((error) => {
        
        res.status(500).json({

            message: 'Something Went Wrong',
            error: error
        })
    });
}



//@desc GET /posts
//to get the certain id

function show(req, res) {
    const id = req.params.id;

    models.Post.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({
                    message: 'Post Not Found!'
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: 'Something Went Wrong'
            });
        });
}




//@desc GET '/posts'
//to get all users


function index (req,res) {

    models.Post.findAll()

    .then((result) => {
        
        res.status(200).json(result)
    }).catch((err) => {
        
        res.status(500).json({
            message: 'Something Went Wrong'
        })
    });
}



//@desc PATCH '/posts'
// to update the post

function update (req,res){

    const id = req.params.id

    const updatePost = {

        title: req.body.title,
        content: req.body.content,
        imageUrl: req.body.image_url,
        categoryId: req.body.category_id,
    }

    const userId = 1

    // validate strating
    const schema = {

        title: {type:'string', optional:false, max:'100'},  //it defines optional for field is mandatory
        content: {type:'string', optional:false, max:'100'}, //length defines for the length the characters in the field
        categoryId: {type:'number', optional:false}
      }

      const v = new Validator();
      const validationResponse = v.validate(updatePost, schema)

      if(validationResponse !== true){

        return res.status(400).json({
            
            message: 'Validation Failed!',
            errors: validationResponse
        })
      }
      //validate ending

    models.Post.update(updatePost, {where: {id:id, userId : userId}})

    .then((result) => {
        
        res.status(200).json({
            message: 'Post Updated Successfully',
            post: updatePost
        })
    }).catch((error) => {
        
        res.status(500).json({
            message: 'Something Went Wrong',
            error:error
        })
    });
}



//@desc DELETE '/posts'
//to delete the certain id

function destroy (req,res){

    const id = req.params.id
    const userId = 1

    models.Post.destroy( {where: {id:id, userId:userId}})

    .then((result) => {
        
        res.status(200).json({
            message: 'Post Updated Successfully'
        }).catch((err) => {
            res.status(500).json({
                message: 'Something Went Wrong'
            })
        });
    })

}

    

module.exports = {
    save : save,
    show: show,
    index: index,
    update: update,
    destroy: destroy
}