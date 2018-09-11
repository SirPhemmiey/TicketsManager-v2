import Ticket from '../models/ticketModel';
import Response from '../models/responseModel';
import jwt from 'jsonwebtoken';



exports.allTickets = async (req, res) => {
    const authorizationToken = req.headers['authorization'].split(" ")[1];
    //if the header is provided
    if (authorizationToken) {
        try {
            const token = jwt.verify(authorizationToken, 'Algorithm...221');
            let tickets = await Ticket.find({user: token._id});
            //if tickets is found
            if (tickets) {
                //ok
                res.status(200).json({
                    success: true,
                    tickets: tickets
                });
            }
            else {
                //internal server error
                res.status(500).json({
                    success: false,
                    message: "An error occured"
                });
            }
        }
        catch(err) {
            console.log(err.message);
            res.status(401).json({
                success: false,
                message: 'Unauthorized Access'
            });
        }

    }
    //auth header not provided
    else {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Access'
        });
    }

}


// exports.processTicket = async (req, res) => {
//     let ticket = await Ticket.findById()
// }
exports.respondTicket = async (req, res) => {
    let {
        ticketId,
        response
    } = req.body;
    // const findTicket = await Ticket.findById(ticketId, (err, ticket) => {
    //     if (err) {
    //         res.json({
    //             message: 'Could not find ticket',
    //             success: false
    //         });
    //     }
    //     const responseTicket = await Response.create({response: response});
    //     if (responseTicket) {

    //     }
    // });
    const findTicket = await Ticket.findById(ticketId);
    if (findTicket) {
        const responseTicket = await Response.create({
            response: response,
            ticket: ticketId
        });
        if (responseTicket) {
            //ok
            res.status(200).json({
                success: true,
                message: 'Successful'
            });
        }
    } else {
        //bad request
        res.status(400).json({
            success: false,
            message: 'Could not find ticket'
        });
    }
}

exports.editTicket = async (req, res) => {
    const authorizationToken = req.headers['authorization'].split(" ")[1];
    try {
        const token = jwt.verify(authorizationToken, 'Algorithm...221');
        if (token) {
            const query = {
                subject: req.body.subject,
                complain: req.body.complain
            };
            const options = {
                new: true
            }
            const editedTicket = await Ticket.findOneAndUpdate({_id: req.body.p}, query, options)
            if (editedTicket) {
                res.status(200).json({
                    success: true,
                    data: editedTicket
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'An error occured'
                });
            }
        }
    }
    catch(err) {
        res.status(402).json({
            success: false,
            message: err.message
        });
    }
}

exports.getTicketInfo = async (req, res) => {
    const authorizationToken = req.headers['authorization'].split(" ")[1];
    try {
        const token = jwt.verify(authorizationToken, 'Algorithm...221');
        if (token) {
            const ticket = await Ticket.findById(req.params.ticketID);
            if (ticket) {
                res.status(200).json({
                    success: true,
                    data: ticket
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Could not find ticket'
                });
            }
        }
    }
    catch(err) {
        res.status(401).json({
            success: false,
            message: 'Provide a token'
        });
    }
}

exports.submitTicket =  async (req, res) => {
    const authorizationToken = req.headers['authorization'].split(" ")[1];
    try {
        const token = jwt.verify(authorizationToken, 'Algorithm...221');
        if (token) {
            req.body.user = token._id;
             if (!req.body) {
             res.json({
                 message: 'Please fill all the fields',
                 success: false
             });
         }
       try {
         const ticket = await Ticket.create(req.body);
         if (ticket) {
             req.body = undefined;
             //ok
             res.status(200).json({
                 message: 'Ticket submitted successfully',
                 success: true
             });
         } else {
             //bad request
             res.status(400).json({
                 success: false,
                 message: 'Could not create ticket'
             });
         }
       }
       catch(err) {
           //internal server error
           res.status(500).json({
               success: false,
               message: err.message
           });
       }
     }
     else {
         //unathorized access
         res.status(401).json({
             success: false,
             message: 'Unathorized access'
         });
     }
    }
    catch(err) {
        console.log(err.message);
    }
 }

// exports.deleteTickets = (req, res) => {
//     for (let i = 1; i <= Ticket.length; i++) {
//         if (Ticket[i].id === parseInt(req.params.ticketId, 10)) {
//             Ticket.splice(i, 1);
//             return res.status(200).json({
//                 message: 'Ticket deleted successfully',
//                 error: false
//             });
//         }
//     }
// }