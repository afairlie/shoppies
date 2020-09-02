import styled from 'styled-components'
import {motion} from 'framer-motion'

export const ResponsiveFlexRow = styled(motion.section)`
  display: flex;
  justify-content: space-between;

  @media (max-width: 779px) {
    flex-direction: column;
    padding: 0 ${({theme}) => theme.spacing.md}
  }
`

export const FlexColumn = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
`