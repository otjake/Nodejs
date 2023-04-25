const { Router } =  require ('express')

const router = Router();

//router has almost everything express has along with the registering of middle wares which will affect only routes
//withing this file
router.use((request, response, next) => {
    // if(request.session.user) next(); //normal login
    if(request.user) next(); //using passport and its dserializer login
    else response.send(401)
})
const groceryList = [
    {
        item : 'milk',
        quantity: 3
    },
    {
        item: 'milo',
        quantity: '4'
    },
    {
        item: 'sugar',
        quantity: '3'
    }
];

//get request
router.get('/',(request, response) => {
    response.send(groceryList)
})

router.get('/:item',(request,response) => {
    let requestParams = request.params;
    const {item} = requestParams;
    const groceryItem = groceryList.find((g) => g.item === item);
    response.send(groceryItem)
})

router.post('/',(request, response) => {
    console.log(request.body);
    groceryList.push(request.body);
    response.sendStatus(201)
})

//add items to cart using sessions
router.post('/shopping/cart/item',(request, response) => {
    const { item , quantity } = request.body;
    const cartItem = { item , quantity };
    const { cart } = request.session
    //if cart sessions exist put new item into it
    //else creat a cart session and add the cart item
    if(cart){
        request.session.cart.items.push(cartItem)
    }else {
        request.session.cart = {
            items: [cartItem]
        }
    }
    response.send(request.session)
})

//get items added cart using sessions
router.get('/shopping/cart',(request, response) => {
    console.log(request.session)
    const  { cart } = request.session;
    if(!cart){
        response.send('You have no cart session')
    }
    response.send(cart)

})

module.exports = router;