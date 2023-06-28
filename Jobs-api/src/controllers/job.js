const jwt = require("jsonwebtoken")
const CustomAPIError = require("../errors/custom-error");
const { BadRequestError,NotFoundError } = require('../errors')
const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')

const getAllJobs = async (req,res) => {
    const jobs = await Job.find({ createdBy: req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs, count: jobs.length})

}
const getJob = async (req,res) => {
    const {user:{userId}, params:{id:jobId}} = req
    const job = await Job.findOne({
            createdBy: userId,
            _id: jobId
        })
    if(!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}
const createJob = async (req,res) => {
    req.body.createdBy = req.user.userId; // adding the loggd in user. check middleware auth.js
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}
const updateJob = async (req,res) => {
    //userId is added to the request in middleware\authjs
    const {
        body: {company,position},
        user:{userId},
        params:{id:jobId}
    } = req

    if(company === '' || position === ''){
        throw  new BadRequestError('Company or Position fields cannot be empty')
    }
    const job = await Job.findByIdAndUpdate({
        createdBy: userId,
        _id: jobId
    },
    req.body,
    {
        new:true,
        runValidators:true
    });
    if(!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}
const deleteJob = async (req,res) => {
    //userId is added to the request in middleware\authjs
    const {
        user:{userId},
        params:{id:jobId}
    } = req

    const job = await Job.findOneAndRemove({
            createdBy: userId,
            _id: jobId
        });
    if(!job) {
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({message : 'deleted'})
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}