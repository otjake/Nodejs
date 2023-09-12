const Queue = require('bull');

// Create a new Bull queue
const jobQueue = new Queue('testQueue', {
    redis: {
        port: 6379,
        host: 'localhost',
    },
});

// Add a job to the queue
const addJobToQueue = async () => {
    await jobQueue.add({ message: 'This is a test job' });
};

// Process jobs from the queue
jobQueue.process(async (job) => {
    console.log(`Processing job: ${job.data.message}`);
});

module.exports = { addJobToQueue };
