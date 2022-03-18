// Write your "actions" router here!
const express = require("express"); //

const router = express.Router()

const Actions = require("./actions-model")

router.get("/", (req, res) => {
    Actions.get()
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json("Failed")
    })
});

router.get("/:id", (req, res) => {
    Actions.get(req.params.id)
    .then(actions => {
    if(actions) {
        res.status(200).json(actions);
    }else {
        res.status(404).json({message:"ACTION NOT FOUND"})
    }
})
  .catch(err => {
      console.log(err)res.status(500).json({message:err.message})
  })
})


router.post('/', (req, res) => {
    Actions.insert(req.body)
    .then(action => {
        if(!req.body.notes || !req.body.description || !req.body.project_id){
            res.status(400).json({message:"missing required field"})
        } else {
            res.status(200).json(action)
        }
    })
    .catch(err => {
        res.status(500).json(err);
    })
});


router.put('/:id', (req, res) => {
    Actions.update(req.params.id, req.body)
        .then(action => {
          if (action) {
            res.status(200).json(action);
          } else if (!req.body.description || !req.body.notes || !req.body.project_id){
              res.status(400).json({message:"missing required fields"})
          }
           else {
            res.status(404).json({ message: 'The action could not be found' });
          }
        })
        .catch(error => {
          console.log(error);
          res.status(500).json({
            message: 'Error updating the action',
          });
        });
    });

    router.delete('/:id', (req, res) => {
        Actions.remove(req.params.id)
        .then(() => {
            res.status(201).json({message: 'Deleted'
            })
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
    })


    router.use((err, req, res) => {
        res.status(500).json({message: `error: ${err.message}`,
        stack: err.stack,
     })
    })
    
    module.exports = router;

