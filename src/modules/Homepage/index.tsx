import React from "react";
import Layout from "@theme/Layout";
import clsx from "clsx";
import Link from '@docusaurus/Link';

import SearchBar from '@theme-original/SearchBar';
import ProductLogo from "../../theme/DocSidebar/Desktop/ProductSwitcher/ProductLogo";

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

import styles from "./styles.module.css";

import Fusion from "./images/fusion.inline.svg";
import Nextflow from "./images/nextflow.inline.svg";
import MultiQC from "./images/multiqc.inline.svg";
import Platform from "./images/platform2.inline.svg";
import Wave from "./images/wave.inline.svg";

import Card from "../../components/Card";
import Grid from "../../components/Grid";

import Resources from "./Resources";

export default function Home(): JSX.Element {
  return (
    <Layout>
      <div className="flex w-full">
        <aside className="block w-[--doc-sidebar-width]">
          <div className="sticky top-0 h-full max-h-dvh">
            <div className="h-full max-h-dvh overflow-scroll -mt-25 pt-25 px-[30px]">
              <SearchBar />
              <div className={clsx("mt-5", styles.sidebarProductLogos)}>
                <Link href="/platform"><ProductLogo product="platform" /></Link>
                <Link href="/nextflow" className="text-gray-1000"><ProductLogo product="nextflow" /><ExternalLinkIcon /></Link>
                <Link href="/multiqc"><ProductLogo product="multiqc" /></Link>
                <Link href="/wave"><ProductLogo product="wave" /></Link>
                <Link href="/fusion"><ProductLogo product="fusion" /></Link>
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-grow">
          <div className={clsx("md:p-8", styles.page)}>
            <div className="container-lg flex flex-wrap text-brand-1000">
              <div className="w-full md:w-3/5 flex lg:pl-3">
                <div className={"box px-4 pt-8 pb-10 sm:p-10"}>
                  <div style={{ maxWidth: 600 }}>
                    <h1 className="mb-8">Getting started with Seqera</h1>
                    <p>
                      Welcome to your central resource for analysis development with
                      Seqera.
                    </p>
                    <p className="hidden md:block">
                      Here you will learn how to compose data analysis pipelines,
                      optimize resource utilization, safeguard reproducibility, and
                      ensure data integrity.
                    </p>
                    <p className="hidden md:block">
                      You can also learn how to establish your own centralized hub
                      for managing & executing pipelines, and how to leverage the
                      cloud to scale for your data analysis requirements.
                    </p>
                    <p>Read the docs, take part, and join the community today!</p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/5 p-4 sm:p-8 md:pl-4 md:py-0 md:pr-0 lg:pr-4">
                <Grid vertical>
                  <div>
                    <Card
                      to="/platform/"
                      title="Seqera Platform"
                      Img={Platform}
                      id="platform"
                    >
                      Fully integrated and scalable tools for modern bioinformatics
                    </Card>
                  </div>
                  <div>
                    <Card
                      to="https://www.nextflow.io/docs/latest/"
                      title="Nextflow"
                      Img={Nextflow}
                      id="nextflow"
                    >
                      Open-source orchestrator for deploying workflows
                    </Card>
                  </div>
                  <div>
                    <Card
                      to="/multiqc/"
                      title="MultiQC"
                      Img={MultiQC}
                      id="multiqc"
                    >
                      Open-source tool to aggregate bioinformatics analysis results
                    </Card>
                  </div>
                  <div>
                    <Card to="/wave/" title="Wave" Img={Wave} id="wave">
                      Next-generation container provisioning for data analysis
                    </Card>
                  </div>
                  <div>
                    <Card to="/fusion/" Img={Fusion} title="Fusion" id="fusion">
                      Distributed, lightweight file system for cloud data pipelines
                    </Card>
                  </div>
                </Grid>
              </div>
              <div className="box px-4 pt-8 pb-10 sm:p-10 mt-8 w-full">
                <Resources />
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
