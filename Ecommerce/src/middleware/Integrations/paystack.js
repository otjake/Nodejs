const Paystack = require('paystack');

const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);

const initialize = async (data) => {
    console.log("body data", data);

    return new Promise(async (resolve, reject) => {
        try {
            const response = await paystack.transaction.initialize({
                email: data.email,
                amount: data.amount,
            });
            console.log("response after initialize", response);      
            const responseData = response.data;
            resolve(responseData);
        } catch (error) {
            console.error("Error in Paystack initialization:", error);
            reject(error);
        }
    });
};

const verify = async (reference) => {
    console.log("reference", reference);

    return new Promise(async (resolve, reject) => {
        try {
            const response = await paystack.transaction.verify(reference);
            console.log("response fter verify", response);

            const verificationResponse = response;
            resolve(verificationResponse);
        } catch (error) {
            console.error("Error in Paystack verifying transaction:", error);
            reject(error);
        }
    });
};

module.exports = {
    initialize,
    verify,
};
