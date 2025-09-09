export default function Loader() {
  return (
    <div>
      <svg width="30" height="20" viewBox="0 0 120 30">
        <circle cx="30" cy="25" r="10" fill="#f5f3ff">
          <animate
            attributeName="cy"
            from="15"
            to="15"
            dur="0.6s"
            begin="0s"
            repeatCount="indefinite"
            values="25;15;25"
            keyTimes="0;0.5;1"
          ></animate>
        </circle>
        <circle cx="60" cy="25" r="10" fill="#f5f3ff">
          <animate
            attributeName="cy"
            from="15"
            to="15"
            dur="0.6s"
            begin="0.2s"
            repeatCount="indefinite"
            values="25;15;25"
            keyTimes="0;0.5;1"
          ></animate>
        </circle>
        <circle cx="90" cy="25" r="10" fill="#f5f3ff">
          <animate
            attributeName="cy"
            from="15"
            to="15"
            dur="0.6s"
            begin="0.4s"
            repeatCount="indefinite"
            values="25;15;25"
            keyTimes="0;0.5;1"
          ></animate>
        </circle>
      </svg>
    </div>
  );
}
