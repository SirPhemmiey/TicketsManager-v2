import Ticket from '../models/ticketModel';
import Response from '../models/responseModel';


exports.allTickets = async (req, res) => {
    let tickets = await Ticket.find();
    res.json({
        tickets
    });
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
            res.status(200).json({
                success: true,
                message: 'Successful'
            });
        }
    } else {
        res.json({
            success: false,
            message: 'Could not find ticket'
        });
    }
}
exports.submitTicket = async (req, res) => {
    //let { submit, complain } = req.body;
    if (!req.body) {
        res.json({
            message: 'Please fill all the fields',
            success: false
        });
    }
    const ticket = await Ticket.create(req.body);
    if (ticket) {
        req.body = undefined;
        res.json({
            message: 'Ticket submitted successfully',
            success: true
        });
    }
}

exports.deleteTickets = (req, res) => {
    for (let i = 1; i <= Ticket.length; i++) {
        if (Ticket[i].id === parseInt(req.params.ticketId, 10)) {
            Ticket.splice(i, 1);
            return res.status(200).json({
                message: 'Ticket deleted successfully',
                error: false
            });
        }
    }
}