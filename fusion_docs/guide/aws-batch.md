---
title: AWS Batch
description: "Use Fusion with AWS Batch and S3 storage"
date: "23 Aug 2024"
tags: [fusion, storage, compute, aws batch, s3]
---

Fusion simplifies and improves the efficiency of Nextflow pipelines in [AWS Batch](https://aws.amazon.com/batch/) in several ways:

- No need to use the AWS CLI tool for copying data to and from S3 storage.
- No need to create a custom AMI or create custom containers to include the AWS CLI tool.
- Fusion uses an efficient data transfer and caching algorithm that provides much faster throughput compared to AWS CLI and does not require a local copy of data files.
- By replacing the AWS CLI with a native API client, the transfer is much more robust at scale.

### Platform AWS Batch compute environments 

Seqera Platform supports Fusion in Batch Forge and manual AWS Batch compute environments. 

See [AWS Batch](https://docs.seqera.io/platform/latest/compute-envs/aws-batch) for compute and storage recommendations and instructions to enable Fusion.

### Nextflow CLI

:::tip
Fusion file system implements a lazy download and upload algorithm that runs in the background to transfer files in
parallel to and from the object storage into the container-local temporary directory (`/tmp`). To achieve optimal performance, set up an SSD volume as the temporary directory.

Several AWS EC2 instance types include one or more NVMe SSD volumes. These volumes must be formatted to be used. See [SSD instance storage](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ssd-instance-store.html) for details. Seqera Platform automatically formats and configures NVMe instance storage with the “Fast instance storage” option when you create an AWS Batch compute environment.
:::

1. Add the following to your `nextflow.conf` file:

    ```groovy
    process.executor = 'awsbatch'
    process.queue = '<YOUR AWS BATCH QUEUE>'
    process.scratch = false
    process.containerOptions = '-v /path/to/ssd:/tmp' // Required for SSD volumes
    aws.region = '<YOUR AWS REGION>'
    fusion.enaled = true
    wave.enabled = true
    ```

    Replace `<YOUR AWS BATCH QUEUE>` and `<YOUR AWS REGION>` with your AWS Batch queue and region.

1. Run the pipeline with the usual run command:

    ```
    nextflow run <YOUR PIPELINE SCRIPT> -w s3://<YOUR-BUCKET>/work
    ```

    Replace `<YOUR PIPELINE SCRIPT>` with your pipeline Git repository URI and `<YOUR-BUCKET>` with your S3 bucket.
