const { Router } =  require ('express')

const router = Router();

//router has almost everything express has along with the registering of middle wares which will affect only routes
//withing this file

const marketList = [
    {
        id:1,
        store : 'Shoprite',
        address: "3 adalegbo",
        miles: 0.6
    },
    {
        id: 2,
        store : 'Adide',
        address: "3 island",
        miles: 1.3
    },
    {
        id: 3,
        item: 'Spar',
        quantity: '3 iyanaipaja',
        miles: 1.1
    },
    {
        id:4,
        store : 'Shoprite',
        address: "3 adalegbo",
        miles: 8
    }
];

//get request
router.get('/',(request, response) => {
    const { miles } = request.query;
    const parsedMiles = parseInt(miles)
    //we used the if, becuase, query parameter are not always available, unlike request parameter
    if(!isNaN(parsedMiles)){
        const filteredStores = marketList.filter((s) => s.miles <= parsedMiles)
        response.send(filteredStores)
    }else{
        response.send(marketList)
    }
})

module.exports = router;