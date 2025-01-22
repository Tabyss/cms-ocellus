import { Box, Flex, Heading } from '@chakra-ui/react'
import style from '../Login.module.css'
import { BubbleDone, BubbleNotif, BubbleText, Paper1, Paper2, Paper3, Step1, Step2, Vektor1, Vektor2, Vektor3, Vektor4 } from '../../../assets/illustrations/Login'
import { useTranslation } from 'react-i18next';


function LoginSlider(props: any) {
    const { page } = props
    const { t } = useTranslation()

    return (
        <Flex  h='max-content' justify='center' overflow='hidden' position='relative'>
            <Flex className={style.progress}>
                <Box className={`${style.path} ${page > 0 ? style.past : page === 0 ? style.active : ''}`}>1</Box>
                <Box className={`${style.path} ${page > 1 ? style.past : page === 1 ? style.active : ''}`}>2</Box>
                <Box className={`${style.path} ${page > 2 ? style.past : page === 2 ? style.active : ''}`}>3</Box>
                <Box className={`${style.path} ${page > 3 ? style.past : page === 3 ? style.active : ''}`}>4</Box>
            </Flex>
            <Flex className={style.slides} style={{ transform: `translateX(${-page * 100}%)` }}>
                {/* slide 1 */}
                <Flex className={style.slide1}>
                    <img src={Vektor1} className={style.Vektor1} />
                    <img src={BubbleText} className={style.BubbleText} />
                    <img src={Step1} className={style.Step1} />
                    <Heading size='chakra_body_medium' textAlign='center'>{t('LOGIN_STEP_1')}</Heading>
                </Flex>
                {/* slide 2 */}
                <Flex className={style.slide2}>
                    <img src={Vektor2} className={style.Vektor2} />
                    <img src={Step1} className={style.Step1} />
                    <img src={Step2} className={style.Step2} />
                    <img src={Paper1} className={style.Paper1} />
                    <img src={Paper2} className={style.Paper2} />
                    <img src={Paper3} className={style.Paper3} />
                    <Heading size='chakra_body_medium' textAlign='center'>{t('LOGIN_STEP_2')}</Heading>
                </Flex>
                {/* slide 3 */}
                <Flex className={style.slide3}>
                    <img src={Vektor3} className={style.Vektor3} />
                    <img src={BubbleNotif} className={style.BubbleNotif} />
                    <Heading size='chakra_body_medium' textAlign='center'>{t('LOGIN_STEP_3')}</Heading>
                </Flex>
                {/* slide 4 */}
                <Flex className={style.slide4}>
                    <img src={Vektor4} className={style.Vektor4} />
                    <img src={BubbleDone} className={style.BubbleDone} />
                    <Heading size='chakra_body_medium' textAlign='center'>{t('LOGIN_STEP_4')}</Heading>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default LoginSlider