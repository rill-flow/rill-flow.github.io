import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import HomepageCarousel from "@site/src/components/HomepageCarousel";
import Translate, {translate} from '@docusaurus/Translate';

function HomepageHeader() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <div className={"tailwind"}>
            <header className={clsx(styles.hero, " ")}>
                <div
                    className={"  items-center max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 text-center "}>
                    <div className="grid mr-auto content-center justify-items-center ">
                        <img
                            src="./img/logo.svg"
                            alt="mockup" className={''}/>
                        <h1 className={"py-5 max-w-2xl mb-4 text-4xl font-extrabold tracking-tight md:text-6xl xl:text-7xl dark:text-white"}>Rill
                            Flow</h1>
                        <p className={"pb-0 max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-2xl lg:text-2xl dark:text-gray-400"}><Translate>面向云原生场景的分布式、高性能流程编排引擎</Translate></p>
                        <div>
                            <a href={"docs/getting-started/quickstart"}
                               className={"inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"}>
                                <Translate>快速开始</Translate>
                                <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                          clip-rule="evenodd"></path>
                                </svg>
                            </a>
                            <a href={"https://github.com/weibocom/rill-flow"}
                               className={"inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-gray-400 dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"}>
                                GitHub
                                <svg className="w-5 h-5 ml-2 -mr-1"
                                     xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 1024 1024"
                                >
                                    <path
                                        d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default function Home(): JSX.Element {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={siteConfig.title}
            description="Distributed, high-performance process orchestration engine">
            <HomepageHeader/>
            <main className={"tailwind"}>
                <HomepageCarousel/>
                <HomepageFeatures/>
            </main>
        </Layout>
    );
}
