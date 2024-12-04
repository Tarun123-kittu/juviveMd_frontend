import React from 'react'
import DataTable from '../../components/DataTable/DataTable'
import Default_user from '../../Images/default_user.svg'

const TrainerDashboardComponent = () => {
    const columns = [
        "User Name	",
        "Date",
        "Age",
        "Phone No.",
        "Gender",
        "Goal",
        "Assign Trainer",
        "Status",
        "Action",
    ];
    return (
        <div> (
            <div className="wrapper">
                {/* <div className="inner_wrapper">
                    <div className="cmn_head mb-3">
                        <h2 className="mb-2">Dashboard</h2>
                        <div className="dashboardinfo tariner_cards">
                            <div className="info_card payment-card">
                                <div className="info_image d-flex align-items-center justify-content-center">
                                    <svg width="49" height="51" viewBox="0 0 49 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M24.3635 0.142057C21.2592 0.666876 18.892 2.83315 18.088 5.89273C16.9602 10.1248 19.7629 16.4784 23.593 18.3767C24.5198 18.8345 24.5756 18.8457 25.6699 18.8457C26.9317 18.8457 27.49 18.6894 28.5285 18.0306C30.8065 16.6124 32.8611 13.2067 33.5087 9.76746C33.8995 7.71285 33.4975 5.36791 32.4702 3.67063C30.8735 1.0577 27.557 -0.393927 24.3635 0.142057Z" fill="black" />
                                        <path d="M17.7092 18.4216C15.6769 19.5047 13.4548 21.47 12.0479 23.4241C11.1657 24.6524 10.1273 26.7405 9.66945 28.1921C9.31212 29.3311 9.11113 30.5147 9.27862 30.5147C9.33446 30.5147 10.2278 29.8782 11.2551 29.1189C12.2824 28.3484 13.3878 27.5891 13.6893 27.4328C15.2526 26.64 17.6087 26.4613 19.6298 26.9862C20.9698 27.3323 22.5443 28.0693 23.9512 28.9961L25.012 29.7107L27.8036 30.2244C29.3334 30.5147 30.8855 30.8497 31.2652 30.9725C32.7838 31.475 34.3806 32.7145 35.2627 34.0656C35.5307 34.4788 35.7876 34.9031 35.8211 35.0036C35.8657 35.1153 35.9439 35.2046 36.022 35.2046C36.2677 35.2046 39.2045 33.4626 39.8633 32.9155C40.2318 32.614 40.9241 31.9887 41.4042 31.5197C42.197 30.7492 42.264 30.6376 42.264 30.2244C42.264 29.9899 42.1635 29.4093 42.0407 28.9514C40.9129 24.8534 38.5233 21.5258 35.0059 19.1697C33.7441 18.3322 32.9625 17.9637 32.6163 18.0531C32.4823 18.0866 31.991 18.4886 31.522 18.9464C30.5282 19.9067 29.4339 20.599 28.2279 21.001C27.4463 21.269 27.1895 21.2913 25.7378 21.2913C24.2862 21.2913 24.0294 21.269 23.2477 21.001C22.0529 20.599 20.9363 19.9067 20.0095 18.991C19.1832 18.1871 18.9487 18.0084 18.6584 18.0084C18.569 18.0084 18.1447 18.1982 17.7092 18.4216ZM33.6101 23.9824C33.8334 24.1946 33.8893 24.3621 33.8893 24.8199V25.3782H34.2689C34.9054 25.3782 35.3521 25.6015 35.5196 25.9923C35.8322 26.7628 35.2739 27.3881 34.2801 27.3881H33.8893V27.9465C33.8893 28.4043 33.8334 28.5718 33.6101 28.7839C32.9848 29.4204 31.991 28.8844 31.991 27.913V27.4216L31.4103 27.3658C29.9364 27.2206 29.9364 25.5904 31.4103 25.4117L31.991 25.3447V24.8534C31.991 23.8819 32.9848 23.3459 33.6101 23.9824Z" fill="black" />
                                        <path d="M15.5755 28.7728C14.5147 29.0743 14.5594 29.0519 10.1822 32.2902C9.59034 32.7257 9.54568 32.7815 9.69084 32.949C10.0147 33.3063 16.0445 42.2952 16.3013 42.7977C16.4353 43.0769 16.614 43.5124 16.6921 43.7692L16.8373 44.227L17.9093 44.4169C20.1202 44.8188 21.8957 45.3325 25.8821 46.7506C27.2779 47.2419 28.2493 47.3313 29.6451 47.1191C32.8275 46.6278 38.299 45.567 38.969 45.3102C39.974 44.9417 40.5881 44.5062 44.7644 41.2679C48.6726 38.2419 48.7843 38.1079 48.7843 37.0471C48.7843 36.3212 48.5274 35.8076 47.8128 35.1041C46.7185 34.021 45.747 33.619 44.2172 33.6078C42.9107 33.6078 42.6651 33.7083 39.304 35.6066L36.6018 37.1364L36.6129 38.3759C36.6241 39.8833 36.4678 40.5086 35.8871 41.1674C35.3065 41.8151 34.6588 42.1277 33.8548 42.1277C33.5087 42.1277 31.4094 41.8263 29.1873 41.4578C25.7257 40.8883 25.1004 40.7543 24.8771 40.5421C24.2964 39.995 24.7319 38.9453 25.5471 38.9677C25.7369 38.9788 27.624 39.2692 29.7344 39.6153C31.8337 39.9615 33.7097 40.2295 33.9107 40.2071C34.5136 40.1513 34.7258 39.7158 34.7146 38.5768C34.6923 36.1649 33.4305 34.1326 31.3089 33.0942C30.4603 32.681 30.0694 32.5805 27.2444 32.0557L24.1178 31.4639L23.2245 30.8162C22.0743 29.9899 20.3324 29.1301 19.2157 28.8398C18.1884 28.583 16.3907 28.5495 15.5755 28.7728Z" fill="black" />
                                        <path d="M4.27614 32.9155C3.75132 33.083 0.825732 34.9701 0.289747 35.4949C-0.223905 35.9863 -0.112241 36.3436 1.09372 38.0074C6.43124 45.433 9.65832 49.799 9.89281 49.933C10.306 50.1564 10.574 50.0559 12.1261 49.0509C13.7675 47.9789 14.2589 47.5211 14.6497 46.7171C15.0405 45.9243 15.074 44.6737 14.7167 43.9144C14.2477 42.8759 8.60868 34.5905 7.8382 33.7865C7.00073 32.9155 5.45977 32.5359 4.27614 32.9155Z" fill="black" />
                                    </svg>

                                </div>
                                <h3>Total Patients  </h3>
                                <h4>
                                    10 <span>Till Today</span>
                                </h4>
                            </div>

                            <div className="info_card plan-card">
                                <div className="info_image d-flex align-items-center justify-content-center">
                                    <svg
                                        width="44"
                                        height="51"
                                        viewBox="0 0 44 51"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M17.1959 0.625546C16.5803 0.850296 16.0721 1.22163 15.691 1.7493C15.3881 2.16949 15.1145 2.94146 15.1145 3.39097C15.1145 3.88933 14.919 3.96751 13.7464 3.96751C12.906 3.96751 12.564 4.00659 12.1438 4.17271C11.4598 4.42678 10.7758 5.08149 10.4631 5.77529L10.2286 6.31274H6.20258C2.50883 6.31274 2.1375 6.33229 1.77594 6.49841C1.27758 6.72316 0.691267 7.3681 0.554462 7.84692C0.476287 8.11076 0.456744 13.9641 0.476287 28.612L0.505603 48.9961L0.798757 49.4162C0.964878 49.6508 1.31666 49.9732 1.5805 50.1394L2.04955 50.4325L18.818 50.4618C31.2575 50.4814 35.6939 50.4618 35.9969 50.3739C36.5539 50.2175 37.1793 49.6703 37.4529 49.0742L37.6874 48.5759V38.9018C37.6776 28.5143 37.7069 29.0029 37.189 28.7977C36.8959 28.6902 36.378 28.8759 36.2802 29.1299C36.2509 29.2179 36.2216 33.6054 36.2216 38.8724V48.4488L35.9382 48.7322L35.6549 49.0156H19.1209C1.49256 49.0156 2.15704 49.0351 1.98115 48.5759C1.95183 48.4879 1.92252 39.3806 1.92252 28.3384V8.25734L2.16681 8.02281C2.37202 7.80783 2.48928 7.77851 3.144 7.77851H3.87688V26.3157C3.87688 38.7747 3.91597 44.9798 3.9746 45.2241C4.10163 45.6639 4.47296 46.1329 4.89315 46.3577C5.16676 46.5042 5.70421 46.5238 10.4924 46.5531L15.7887 46.5824L15.8962 46.9147C16.033 47.3348 16.5607 47.8039 17.0786 47.9505C17.6942 48.1361 18.2219 47.9505 19.1307 47.2274L19.9027 46.6215L26.3716 46.5726L32.8503 46.5238L33.2412 46.299C33.4562 46.172 33.7493 45.9179 33.8764 45.7225L34.1207 45.3609L34.15 39.4588L34.1695 33.5468L33.9546 33.3123C33.7005 33.0387 33.2998 33.0191 32.9871 33.2732L32.7526 33.4589L32.7233 39.1851C32.7038 44.716 32.694 44.9114 32.5083 45.0091C32.3911 45.0776 30.5344 45.0971 27.0654 45.0873L21.8082 45.058L22.5508 44.4522C23.1762 43.944 24.8081 41.9506 33.0555 31.6706C38.4203 24.9769 42.9055 19.3288 43.0033 19.1334C43.1303 18.8891 43.2085 18.4982 43.2378 17.9608C43.2769 17.2083 43.2573 17.1106 42.9739 16.5243C42.4365 15.4396 41.5375 14.8729 40.3258 14.8729C39.544 14.8729 39.0652 15.0292 38.518 15.4396C38.3519 15.5764 33.8177 21.1561 28.4432 27.8596L18.6812 40.0353L17.4109 42.5467L16.1405 45.058L10.8931 45.0873C6.22212 45.1069 5.63581 45.0873 5.499 44.9505C5.3622 44.8137 5.34266 43.0255 5.34266 26.2863V7.77851H7.77584H10.209L10.2481 8.36483C10.2774 8.8241 10.3458 9.01954 10.5804 9.31269C11.1862 10.0749 10.6488 10.026 19.0623 10.026H26.5671L26.9579 9.81105C27.4465 9.53745 27.8081 8.93159 27.8863 8.27688L27.9449 7.77851H30.3194H32.7038V13.4559V19.1334L32.9969 19.4265C33.2412 19.661 33.3487 19.7099 33.5637 19.661C33.7103 19.622 33.9057 19.5047 34.0034 19.3874C34.1598 19.2018 34.1695 18.7718 34.1695 13.4853V7.77851H34.9317C36.2509 7.78829 36.2216 7.70034 36.2216 11.6384V14.824L36.4659 15.0585C36.7688 15.3712 37.1402 15.3712 37.4431 15.0585L37.6874 14.824V11.5211C37.6776 7.96418 37.6581 7.79806 37.1597 7.14335C37.0131 6.95768 36.6809 6.69384 36.4171 6.55704L35.9382 6.31274H31.8927H27.8472L27.642 5.83392C27.3879 5.20853 26.8211 4.60268 26.2153 4.2802C25.7755 4.05545 25.5606 4.01637 24.4661 3.97728C23.0687 3.90887 22.9319 3.85025 22.9319 3.21508C22.9319 2.31607 22.16 1.20208 21.2023 0.733032C20.7821 0.527824 20.5769 0.498508 19.2186 0.478966C17.9483 0.44965 17.6258 0.478966 17.1959 0.625546ZM20.7528 2.16949C21.1926 2.49196 21.4368 2.93169 21.5053 3.52777C21.5737 4.16294 21.6714 4.3877 22.0427 4.77857C22.502 5.27693 22.7854 5.36488 24.173 5.42351C25.6485 5.49191 25.8537 5.57986 26.2348 6.31274C26.4009 6.65476 26.4498 6.90882 26.4498 7.54399C26.4498 8.10099 26.4107 8.3746 26.313 8.45277C26.225 8.53094 24.212 8.55049 18.9646 8.54072L11.7432 8.5114L11.7139 7.52445C11.6943 6.64499 11.7139 6.51795 11.9093 6.21503C12.3588 5.57008 12.5543 5.49191 13.9223 5.42351C14.9386 5.38442 15.2415 5.33556 15.5738 5.15967C16.1307 4.86651 16.4825 4.31929 16.5705 3.60595C16.6584 2.93169 16.8734 2.49196 17.235 2.22812C17.6649 1.93497 17.7236 1.9252 19.1405 1.94474C20.3229 1.96428 20.5085 1.98383 20.7528 2.16949ZM41.1662 16.5829C41.7329 16.9249 41.9772 17.8923 41.6547 18.508C41.4691 18.8598 39.3486 21.5177 39.2607 21.4884C39.2313 21.4786 38.6841 21.0584 38.0587 20.5601C37.3649 20.0128 36.9447 19.622 36.9936 19.5536C38.3714 17.7555 39.4072 16.5732 39.7199 16.4363C40.1597 16.2507 40.7264 16.3093 41.1662 16.5829ZM37.3258 21.8499C37.9415 22.3385 38.3323 22.7196 38.2835 22.7783C38.1662 22.9248 22.8147 42.1167 22.7463 42.1949C22.6779 42.273 20.4401 40.5337 20.401 40.3675C20.3913 40.3089 23.8896 35.892 28.1794 30.5371C34.7656 22.3092 35.9969 20.8141 36.1337 20.9118C36.2118 20.9705 36.7493 21.3907 37.3258 21.8499ZM20.5965 42.4685C21.1241 42.9082 21.5639 43.2893 21.5541 43.3284C21.5443 43.4652 17.6552 46.5238 17.489 46.5238C17.3913 46.5238 17.3034 46.4456 17.2838 46.3381C17.2447 46.1427 19.4043 41.6867 19.5411 41.6867C19.5802 41.6867 20.059 42.0385 20.5965 42.4685Z"
                                            fill="black"
                                        />
                                        <path
                                            d="M13.9688 13.9378C13.7342 14.0355 13.3629 14.5045 12.1317 16.3123C11.7017 16.9377 11.3108 17.4459 11.2717 17.4556C11.2326 17.4556 10.8222 17.1234 10.3727 16.7227C9.47372 15.9312 9.25874 15.853 8.81901 16.1951C8.63334 16.3416 8.56494 16.4882 8.56494 16.7227C8.56494 17.0159 8.67243 17.1527 9.60075 17.9931C10.1675 18.5012 10.7441 18.9507 10.8711 18.98C11.3206 19.0973 11.8971 18.9507 12.1903 18.6576C12.7571 18.0908 14.9166 14.8759 14.9166 14.612C14.9166 14.1234 14.4085 13.7619 13.9688 13.9378Z"
                                            fill="black"
                                        />
                                        <path
                                            d="M18.17 14.3307C17.7401 14.5066 17.613 15.1711 17.9453 15.5033C18.1407 15.6988 18.2677 15.6988 23.6422 15.6988C29.7301 15.6988 29.3685 15.7378 29.5249 15.0929C29.5835 14.8779 29.5347 14.7704 29.3001 14.5261L29.007 14.233L23.6911 14.2428C20.7693 14.2428 18.2873 14.2818 18.17 14.3307Z"
                                            fill="black"
                                        />
                                        <path
                                            d="M17.9479 17.7492C17.6841 18.013 17.6939 18.5407 17.9577 18.785C18.1532 18.9609 18.4072 18.9707 23.5863 19L28.9999 19.0195L29.3028 18.7264C29.5373 18.4821 29.5862 18.3746 29.5276 18.1596C29.3712 17.5147 29.7328 17.5538 23.6449 17.5538C18.2704 17.5538 18.1434 17.5538 17.9479 17.7492Z"
                                            fill="black"
                                        />
                                        <path
                                            d="M13.8741 24.6659C13.8057 24.6854 13.1901 25.4965 12.5158 26.4639C11.4409 28.0078 11.265 28.2033 11.1282 28.0958C11.0403 28.0274 10.6592 27.6951 10.2878 27.3629C9.51585 26.6789 9.13475 26.5714 8.76342 26.9427C8.44095 27.2652 8.50935 27.6951 8.94909 28.1153C10.5223 29.6202 11.0403 29.9133 11.7243 29.6886C12.1542 29.542 12.2129 29.4736 13.6786 27.3629C15.0369 25.4183 15.1346 25.174 14.6656 24.8027C14.4115 24.6072 14.1282 24.5584 13.8741 24.6659Z"
                                            fill="black"
                                        />
                                        <path
                                            d="M17.9509 24.9845C17.5307 25.4047 17.8141 26.0887 18.4591 26.206C18.635 26.2353 21.1072 26.2548 23.941 26.2353L29.1103 26.206L29.3449 25.9324C29.6282 25.6001 29.638 25.3851 29.3742 25.0431L29.1787 24.7891H23.6577C18.2734 24.7891 18.1464 24.7891 17.9509 24.9845Z"
                                            fill="black"
                                        />
                                        <path
                                            d="M17.9665 28.2023C17.6538 28.4955 17.6733 29.0036 18.0055 29.2674C18.2596 29.4629 18.3866 29.4727 20.986 29.4727C22.7937 29.4727 23.7807 29.4336 23.9468 29.3652C24.4452 29.1404 24.4843 28.3587 24.0152 28.1144C23.8882 28.046 22.8035 28.0069 21.0055 28.0069C18.2987 28.0069 18.1717 28.0167 17.9665 28.2023Z"
                                            fill="black"
                                        />
                                        <path
                                            d="M13.8732 35.2098C13.8048 35.2293 13.1891 36.0404 12.5149 37.0078C11.44 38.5517 11.2641 38.7472 11.1273 38.6397C11.0393 38.5713 10.6582 38.239 10.2869 37.9068C9.51493 37.2228 9.13383 37.1153 8.7625 37.4866C8.40094 37.8482 8.49866 38.2488 9.08497 38.7862C10.7462 40.3595 11.2445 40.5745 12.0556 40.0664C12.1729 39.9882 12.8667 39.0794 13.5996 38.0338C15.0458 35.9524 15.1337 35.7179 14.6647 35.3466C14.4106 35.1511 14.1272 35.1023 13.8732 35.2098Z"
                                            fill="black"
                                        />
                                    </svg>
                                </div>
                                <h3>Plan Pending</h3>
                                <h4>
                                    10 <span>Till Today</span>
                                </h4>
                            </div>
                            <div className="info_card exercise-card">
                                <div className="info_image d-flex align-items-center justify-content-center">
                                    <svg width="43" height="51" viewBox="0 0 43 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.9402 0.502018C9.78416 0.806789 8.69119 1.616 7.99758 2.65643C7.36702 3.59175 7.13582 4.44301 7.07276 6.02991L7.0097 7.3751H5.89572C5.27567 7.3751 4.48747 7.44867 4.10914 7.53274C2.19644 7.98464 0.662086 9.49798 0.15764 11.4212C0.0210186 11.9677 0 14.0905 0 28.8351C0 40.6791 0.0315279 45.7866 0.115602 46.1754C0.409863 47.5732 1.5764 49.1391 2.78497 49.7486C4.04608 50.3897 3.20534 50.3581 17.7607 50.3581C32.3056 50.3581 31.654 50.3792 32.8311 49.7486C33.4826 49.4018 34.4495 48.4665 34.8173 47.8254C35.3533 46.9111 35.5319 46.207 35.595 44.7147L35.6581 43.3169H36.772C38.7058 43.3169 39.9879 42.844 41.1019 41.73C41.785 41.0469 42.3945 39.9014 42.5627 39.0186C42.6257 38.6613 42.6678 33.8796 42.6678 26.0922C42.6678 12.4826 42.6888 13.0501 42.0162 11.747C41.7429 11.211 40.8707 10.2967 36.8982 6.31366C34.2603 3.67583 31.8747 1.36378 31.6015 1.17461C31.3177 0.985447 30.8238 0.733223 30.498 0.607113C29.899 0.386417 29.8254 0.386417 20.7033 0.365398C12.9054 0.344379 11.4236 0.365398 10.9402 0.502018ZM28.7114 6.55538C28.7535 9.58205 28.7745 9.89733 28.9847 10.5384C29.426 11.8731 30.3824 12.9976 31.6015 13.6176C32.6734 14.1536 33.1043 14.2061 36.4883 14.2061H39.6201V26.3444C39.6201 39.6387 39.6516 38.882 39.0105 39.5756C38.8529 39.7438 38.5376 39.9644 38.3064 40.0695C37.9071 40.2587 37.3185 40.2692 24.8965 40.2692H11.8965L11.3395 39.975C10.9297 39.7648 10.688 39.5441 10.4568 39.1657L10.1415 38.6613L10.1099 22.1512C10.0889 10.5594 10.1099 5.48343 10.194 5.10509C10.3727 4.25384 11.0453 3.59175 11.9281 3.37106C12.1067 3.32902 15.9426 3.29749 20.4616 3.28698L28.6694 3.27647L28.7114 6.55538ZM35.5004 11.1374C33.2724 11.169 32.9046 11.0849 32.3266 10.4123C31.8327 9.82377 31.7381 9.34034 31.7381 7.24899V5.43088L34.5756 8.26839L37.4131 11.1059L35.5004 11.1374ZM7.04123 24.211C7.04123 32.6395 7.08327 38.2935 7.14633 38.7454C7.4511 40.8998 9.27971 42.8125 11.3921 43.2013C11.8125 43.2749 15.3646 43.3169 22.3007 43.3169H32.5788V44.3258C32.5788 44.8828 32.5263 45.5239 32.4632 45.7446C32.2951 46.27 31.8222 46.848 31.2862 47.1318L30.8448 47.363H17.8133H4.77122L4.25627 47.1003C3.85691 46.8901 3.64673 46.6904 3.3945 46.2595L3.0477 45.692V28.9507C3.0477 10.5909 3.00566 11.81 3.65724 11.1164C4.16168 10.5804 4.65562 10.4228 5.91674 10.4228H7.04123V24.211Z" fill="black" />
                                        <path d="M15.8585 18.8616C14.9127 19.4922 14.9337 20.7638 15.9006 21.3523C16.2159 21.552 16.4576 21.5625 19.9572 21.5625C23.4988 21.5625 23.688 21.552 24.0138 21.3523C24.4131 21.1106 24.6969 20.5746 24.6969 20.0912C24.6969 19.6078 24.4131 19.0718 24.0138 18.8301C23.688 18.6304 23.4988 18.6199 19.9467 18.6199C16.2474 18.6199 16.2159 18.6199 15.8585 18.8616Z" fill="black" />
                                        <path d="M15.8998 25.9768C15.4164 26.271 15.2062 26.6493 15.1957 27.2379C15.1852 27.7949 15.3849 28.1522 15.9103 28.541C16.1941 28.7617 16.2782 28.7617 24.8327 28.7617C33.3243 28.7617 33.4819 28.7617 33.8392 28.5515C34.8166 27.984 34.7956 26.5758 33.8182 25.9768C33.4819 25.7771 33.2717 25.7666 24.8538 25.7666C16.4989 25.7666 16.2256 25.7771 15.8998 25.9768Z" fill="black" />
                                        <path d="M15.9846 33.0912C15.5853 33.2909 15.27 33.7428 15.1754 34.2473C15.0703 34.7832 15.4591 35.4768 16.0161 35.7396C16.447 35.9603 16.6152 35.9603 23.1835 35.9603C30.6766 35.9603 30.3613 35.9918 30.8763 35.2246C31.2126 34.7307 31.16 33.8899 30.7817 33.4801C30.2352 32.8916 30.519 32.9126 23.1519 32.9126C17.0145 32.9126 16.3104 32.9336 15.9846 33.0912Z" fill="black" />
                                    </svg>

                                </div>
                                <h3>Exercise In Draft </h3>
                                <h4>
                                    10 <span>Till Today</span>
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="cmn_head mb-2">
                        <h2>Patient List</h2>
                    </div>
                    <DataTable columns={columns}>
                        <tr>
                            <td className="ps-4">
                                <div className="d-flex align-items-center table_user">
                                    <img src={Default_user} alt="User Image" />
                                    <div className="d-inline-grid">
                                        <p className="mb-0">Neeraj</p>
                                    </div>
                                </div>
                            </td>
                            <td>04/09/2024</td>
                            <td>22</td>
                            <td>+146975234</td>
                            <td>Male</td>
                            <td>Lower Back</td>
                            <td>Trainer A</td>
                            <td>
                                <button className="btn_info active">Active</button>
                            </td>
                            <td>
                                <svg
                                    width="25"
                                    height="25"
                                    viewBox="0 0 25 25"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.26562 19.2151L11.0737 19.1953L23.7507 6.5834C24.2482 6.08368 24.5219 5.42004 24.5219 4.71409C24.5219 4.00814 24.2482 3.3445 23.7507 2.84478L21.6633 0.748087C20.6683 -0.251345 18.9323 -0.246057 17.9452 0.744121L5.26562 13.3586V19.2151ZM19.8023 2.6174L21.8936 4.71012L19.7917 6.80153L17.7044 4.70616L19.8023 2.6174ZM7.89788 14.4612L15.8341 6.56489L17.9215 8.66158L9.98658 16.5552L7.89788 16.5619V14.4612Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M2.63226 24.489H21.0581C22.5098 24.489 23.6903 23.3029 23.6903 21.8445V10.3835L21.0581 13.0279V21.8445H6.7886C6.75438 21.8445 6.71884 21.8577 6.68462 21.8577C6.64119 21.8577 6.59776 21.8458 6.55301 21.8445H2.63226V3.33341H11.6438L14.2761 0.688965H2.63226C1.18057 0.688965 0 1.875 0 3.33341V21.8445C0 23.3029 1.18057 24.489 2.63226 24.489Z"
                                        fill="black"
                                    />
                                </svg>
                                <svg
                                    className="me-3 ms-2"
                                    width="22"
                                    height="24"
                                    viewBox="0 0 22 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M3.96355 24C3.28478 24 2.70701 23.7606 2.23026 23.2817C1.7535 22.8028 1.51512 22.223 1.51512 21.5422V2.69372H0V1.17185H6.06048V0H15.1512V1.17185H21.2117V2.69372H19.6965V21.5422C19.6965 22.2422 19.4632 22.8271 18.9966 23.2969C18.5299 23.7666 17.9471 24.001 17.2481 24H3.96355ZM18.1814 2.69372H3.03024V21.5422C3.03024 21.8151 3.11761 22.0393 3.29235 22.2148C3.4671 22.3904 3.69083 22.4781 3.96355 22.4781H17.2496C17.4819 22.4781 17.6956 22.3807 17.8905 22.1859C18.0855 21.9911 18.1824 21.776 18.1814 21.5406V2.69372ZM7.28469 19.4344H8.79981V5.73748H7.28469V19.4344ZM12.4119 19.4344H13.927V5.73748H12.4119V19.4344Z"
                                        fill="black"
                                    />
                                </svg>
                            </td>
                        </tr>
                    </DataTable>
                </div> */}
            </div>

            )
        </div>
    )
}

export default TrainerDashboardComponent