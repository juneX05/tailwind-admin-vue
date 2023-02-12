
const icons = {
    home: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path fill="currentColor" fill-opacity=".3" d="M5 14.059c0-1.01 0-1.514.222-1.945.221-.43.632-.724 1.453-1.31l4.163-2.974c.56-.4.842-.601 1.162-.601.32 0 .601.2 1.162.601l4.163 2.973c.821.587 1.232.88 1.453 1.311.222.43.222.935.222 1.944V19c0 .943 0 1.414-.293 1.707C18.414 21 17.943 21 17 21H7c-.943 0-1.414 0-1.707-.293C5 20.414 5 19.943 5 19v-4.941Z"/>
                <path fill="currentColor" d="M3 12.387c0 .266 0 .4.084.441.084.041.19-.04.4-.205l7.288-5.668c.59-.459.885-.688 1.228-.688.343 0 .638.23 1.228.688l7.288 5.668c.21.164.316.246.4.205.084-.041.084-.175.084-.441v-.409c0-.48 0-.72-.102-.928-.101-.208-.291-.356-.67-.65l-7-5.445c-.59-.459-.885-.688-1.228-.688-.343 0-.638.23-1.228.688l-7 5.444c-.379.295-.569.443-.67.65-.102.209-.102.449-.102.93v.408ZM12.5 15h-1a2 2 0 0 0-2 2v3.85c0 .083.067.15.15.15h4.7a.15.15 0 0 0 .15-.15V17a2 2 0 0 0-2-2Z"/>
                <rect width="2" height="4" x="16" y="5" fill="currentColor" rx=".5"/>
          </svg>`,
    task: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="1.2" d="m8 13 4.228 3.382a1 1 0 0 0 1.398-.148L22 6"/>
              <path fill="currentColor" fill-opacity=".3" fill-rule="evenodd" d="m10.565 12.368 4.9-5.988a.6.6 0 0 0-.93-.76L9.644 11.6l.922.768Zm-2.533 3.096-.922-.769-.967 1.183a.4.4 0 0 1-.55.067L2.36 13.52a.6.6 0 0 0-.72.96l3.233 2.425a1.6 1.6 0 0 0 2.198-.267l.961-1.174Z" />
          </svg>`,
    dashboard: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M20.693 17.33a9 9 0 1 0-17.386 0"/>
                      <path stroke="currentColor" stroke-width="2" d="M12.766 15.582c.487.71.144 1.792-.766 2.417-.91.626-2.043.558-2.53-.151-.52-.756-2.314-5.007-3.403-7.637-.205-.495.4-.911.79-.542 2.064 1.96 5.39 5.157 5.909 5.913Z"/>
                      <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M12 6v2m-6.364.636L7.05 10.05m11.314-1.414L16.95 10.05m3.743 7.28-1.931-.518m-15.455.518 1.931-.518"/>
                </svg>`,
    project: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <rect width="12" height="10" x="6" y="3" fill="currentColor" fill-opacity=".25" rx="2"/>
                <path fill="currentColor" d="M3 10h14.8c1.12 0 1.68 0 2.108.218a2 2 0 0 1 .874.874C21 11.52 21 12.08 21 13.2v4.6c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874C19.48 21 18.92 21 17.8 21H6.2c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C3 19.48 3 18.92 3 17.8V10Zm0 0c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.083-1.083C4.602 7 5.068 7 6 7h2.343c.818 0 1.226 0 1.594.152.368.152.657.442 1.235 1.02L13 10H3Z"/>
            </svg>`,
    calendar:`<svg
            class="h-5 w-5 transition-colors duration-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.5"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>`

}

export default icons