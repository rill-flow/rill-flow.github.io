import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import Translate, {translate} from "@docusaurus/Translate";

type FeatureItem = {
    title: string;
    img: string;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: translate({message: '编排异构服务'}),
        img: 'img/flow.svg',
        description: (
            <Translate>
                通过Rill Flow连接异构服务系统，对接AIGC等外部服务，串联分布式场景下的异构系统业务流程
            </Translate>
        ),
    },
    {
        title: translate({message:'分布式并行处理'}),
        img: 'img/flow2.svg',
        description: (
            <Translate>
                通过Rill Flow可将子任务分发到不同节点，提升流程执行速度
            </Translate>
        ),
    },
    {
        title: translate({message:'对接Serverless'}),
        img: 'img/flow3.svg',
        description: (
            <Translate>
                基于Rill Flow的分支、循环等流程控制功能实现基础业务流程，同时对接触发器、Serverless组件实现业务的按需执行，降低流程执行业务成本
            </Translate>
        ),
    },
];

function Feature({title, img, description}: FeatureItem) {
    return (
        <div
            className={"grid max-w-screen-xl px-4 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12 pb-10"}>
            <div className="mr-auto place-self-center lg:col-span-7">
                <img src={img}/>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex flex-col ">
                <h2 className={'py-7 px-5 max-w-2xl mb-4 text-2xl font-bold tracking-tight md:text-3xl xl:text-4xl dark:text-white'}>{title}</h2>
                <p className={'pb-10 px-5 max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 dark:text-gray-400'}>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageCarousel(): JSX.Element {
    return (
        <section className={'pt-10 bg-gray-50 dark:bg-gray-900'}>
            <div className={'py-0 px-4 mx-auto max-w-screen-xl text-center lg:py-0 lg:px-12'}>
                <h2 className={'font-bold text-4xl text-center pb-8'}><Translate>应用场景</Translate></h2>
            </div>
            <Carousel showThumbs={false} showStatus={false} interval={8000} autoPlay={true} infiniteLoop={true}>
                {FeatureList.map((props, idx) => (
                    <Feature key={idx} {...props} />
                ))}
            </Carousel>
        </section>
    );
}
