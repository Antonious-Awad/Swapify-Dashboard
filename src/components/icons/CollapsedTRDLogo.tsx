import { BaseSVG } from './types'

export const CollapsedTRDLogo = ({ width, height }: BaseSVG) => {
  return (
    <svg
      width={width || '268'}
      height={height || '267'}
      viewBox="0 0 268 267"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_525_3)">
        <path
          d="M8.32811 258.011H247.161L220.047 230.897H34.3773V34.3698L220.417 34.7285L247.086 8.32811H8.32811V258.011ZM267.266 266.339H0V0H267.34L223.835 43.0641L42.7054 42.7129V222.569H223.495L267.266 266.339Z"
          fill="#0E7490"
        />
        <path
          d="M95.4375 179.318H180.852V93.9031H95.4375V179.318ZM189.18 187.646H87.1094V85.575H189.18V187.646Z"
          fill="#0E7490"
        />
      </g>
      <defs>
        <clipPath id="clip0_525_3">
          <rect width="267.34" height="266.339" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
