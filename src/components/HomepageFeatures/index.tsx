import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate, {translate} from "@docusaurus/Translate";

type FeatureItem = {
    title: string;
    Svg: React.ComponentType<React.ComponentProps<'svg'>>;
    description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
    {
        title: translate({message:'高性能'}),
        Svg: require('@site/static/img/perf.svg').default,
        description: (
            <Translate>
                生产环境中每日执行流程超过1000万次，执行延迟低于100ms
            </Translate>
        ),
    },
    {
        title:  translate({message:'分布式'}),
        Svg: require('@site/static/img/distributed.svg').default,
        description: (
            <Translate>
                支持异构分布式系统的编排调度
            </Translate>
        ),
    },
    {
        title:  translate({message:'云原生'}),
        Svg: require('@site/static/img/cloudnative.svg').default,
        description: (
            <Translate>
            面向云原生场景构建，可在云环境中直接部署
            </Translate>
        ),
    },
    {
        title:  translate({message:'AIGC'}),
        Svg: require('@site/static/img/ai.svg').default,
        description: (
            <Translate>
            可与文本、图片等大模型快速集成
            </Translate>
        ),
    },
];

function Feature({title, Svg, description}: FeatureItem) {
    return (
        <a href={'#'}
           className={"cursor-pointer  px-8 flex justify-start flex-col items-center rounded-xl border border-solid shadow hover:shadow-2xl border-gray-50 transition duration-150 ease-in-out"}>
            <div className="text--center">
                <Svg className={styles.featureSvg} role="img"/>
            </div>
            <h3 className={"py-4 font-bold text-gray-700 text-lg"}>{title}</h3>
            <p className={"text-center text-sm text-gray-500 pb-3"}>{description}</p>
        </a>
    );
}

export default function HomepageFeatures(): JSX.Element {
    return (
        <section className={clsx(styles.features)}>
            <div className="container py-0 px-4 mx-auto max-w-screen-xl text-center lg:py-0 lg:px-12">
                <h2 className={"font-bold text-4xl text-center py-8"}><Translate>核心特性</Translate></h2>
                <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
