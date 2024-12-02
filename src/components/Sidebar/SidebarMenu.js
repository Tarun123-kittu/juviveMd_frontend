import React from 'react';
export const SidebarMenuItems = [

    {

        "name": "Dashboard",
        "path": "/dashboard",
        "icon": <svg width="27" height="25" viewBox="0 0 27 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.0416 4.2869C13.9618 4.21057 13.8557 4.16797 13.7453 4.16797C13.6349 4.16797 13.5288 4.21057 13.4491 4.2869L3.58657 13.7129C3.54468 13.753 3.51136 13.8011 3.48861 13.8545C3.46587 13.9078 3.45418 13.9652 3.45424 14.0232L3.45264 22.8698C3.45264 23.3247 3.63325 23.7609 3.95474 24.0826C4.27623 24.4042 4.71227 24.5849 5.16692 24.5849H10.3151C10.5425 24.5849 10.7605 24.4946 10.9212 24.3337C11.082 24.1729 11.1723 23.9548 11.1723 23.7274V16.4383C11.1723 16.3246 11.2174 16.2155 11.2978 16.1351C11.3782 16.0547 11.4872 16.0095 11.6008 16.0095H15.8866C16.0002 16.0095 16.1092 16.0547 16.1896 16.1351C16.27 16.2155 16.3151 16.3246 16.3151 16.4383V23.7274C16.3151 23.9548 16.4054 24.1729 16.5662 24.3337C16.7269 24.4946 16.9449 24.5849 17.1723 24.5849H22.3183C22.773 24.5849 23.209 24.4042 23.5305 24.0826C23.852 23.7609 24.0326 23.3247 24.0326 22.8698V14.0232C24.0327 13.9652 24.021 13.9078 23.9983 13.8545C23.9755 13.8011 23.9422 13.753 23.9003 13.7129L14.0416 4.2869Z" fill="black" />
            <path d="M26.3279 11.9442L22.3207 8.10884V2.28881C22.3207 2.06138 22.2304 1.84326 22.0697 1.68244C21.9089 1.52162 21.6909 1.43127 21.4636 1.43127H18.8921C18.6648 1.43127 18.4468 1.52162 18.286 1.68244C18.1253 1.84326 18.035 2.06138 18.035 2.28881V4.0039L14.9321 1.03573C14.6418 0.742023 14.21 0.57373 13.7434 0.57373C13.2784 0.57373 12.8477 0.742023 12.5573 1.03627L1.16268 11.9431C0.829465 12.2647 0.787679 12.7937 1.09089 13.1421C1.16704 13.23 1.26027 13.3015 1.36491 13.3523C1.46956 13.403 1.58343 13.4319 1.69959 13.4372C1.81576 13.4425 1.93179 13.4242 2.04063 13.3832C2.14947 13.3422 2.24883 13.2795 2.33268 13.1989L13.4487 2.5718C13.5285 2.49547 13.6346 2.45287 13.745 2.45287C13.8554 2.45287 13.9615 2.49547 14.0412 2.5718L25.1584 13.1989C25.3221 13.356 25.5415 13.4417 25.7683 13.4373C25.9952 13.4329 26.211 13.3387 26.3686 13.1753C26.6975 12.8344 26.6702 12.2717 26.3279 11.9442Z" fill="black" />
        </svg>
    },
    {
        "name": "Patient",
        "path": "/patient",
        "icon": <svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.3953 15.5807C19.1447 15.5807 18.0817 15.143 17.2063 14.2676C16.3309 13.3922 15.8932 12.3292 15.8932 11.0786C15.8932 9.82803 16.3309 8.76504 17.2063 7.88963C18.0817 7.01423 19.1447 6.57652 20.3953 6.57652C21.6459 6.57652 22.7089 7.01423 23.5843 7.88963C24.4597 8.76504 24.8974 9.82803 24.8974 11.0786C24.8974 12.3292 24.4597 13.3922 23.5843 14.2676C22.7089 15.143 21.6459 15.5807 20.3953 15.5807ZM12.8918 24.5849C12.4666 24.5849 12.1105 24.4408 11.8233 24.1527C11.5362 23.8646 11.3921 23.5084 11.3911 23.0842V21.7336C11.3911 21.2083 11.5162 20.7081 11.7663 20.2329C12.0164 19.7577 12.3666 19.3825 12.8168 19.1073C13.9423 18.432 15.1369 17.9258 16.4005 17.5886C17.664 17.2515 18.9957 17.0824 20.3953 17.0814C21.795 17.0804 23.1271 17.2495 24.3917 17.5886C25.6563 17.9278 26.8503 18.434 27.9738 19.1073C28.424 19.3825 28.7742 19.7577 29.0243 20.2329C29.2744 20.7081 29.3995 21.2083 29.3995 21.7336V23.0842C29.3995 23.5094 29.2554 23.8661 28.9673 24.1542C28.6792 24.4423 28.323 24.5859 27.8988 24.5849H12.8918ZM11.3911 15.5807H2.38693C1.96174 15.5807 1.60557 15.4366 1.31844 15.1485C1.0313 14.8604 0.887236 14.5042 0.886236 14.08C0.885235 13.6558 1.0293 13.2996 1.31844 13.0115C1.60757 12.7234 1.96374 12.5793 2.38693 12.5793H11.3911C11.8163 12.5793 12.173 12.7234 12.4611 13.0115C12.7493 13.2996 12.8928 13.6558 12.8918 14.08C12.8908 14.5042 12.7468 14.8609 12.4596 15.15C12.1725 15.4391 11.8163 15.5827 11.3911 15.5807ZM17.3939 3.57513H2.38693C1.96174 3.57513 1.60557 3.43106 1.31844 3.14292C1.0313 2.85479 0.887236 2.49863 0.886236 2.07443C0.885235 1.65023 1.0293 1.29407 1.31844 1.00593C1.60757 0.717798 1.96374 0.57373 2.38693 0.57373H17.3939C17.8191 0.57373 18.1758 0.717798 18.4639 1.00593C18.752 1.29407 18.8956 1.65023 18.8946 2.07443C18.8936 2.49863 18.7495 2.85529 18.4624 3.14443C18.1753 3.43356 17.8191 3.57713 17.3939 3.57513ZM13.0419 9.57792H2.38693C1.96174 9.57792 1.60557 9.43385 1.31844 9.14572C1.0313 8.85758 0.887236 8.50142 0.886236 8.07722C0.885235 7.65302 1.0293 7.29686 1.31844 7.00872C1.60757 6.72059 1.96374 6.57652 2.38693 6.57652H14.3925C14.0424 7.00172 13.7612 7.46443 13.5491 7.96467C13.337 8.4649 13.1679 9.00265 13.0419 9.57792Z" fill="black" />
        </svg>
    },
    {
        "name": "Patient",
        "path": "/reception/patient",
        "icon": <svg width="30" height="25" viewBox="0 0 30 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.3953 15.5807C19.1447 15.5807 18.0817 15.143 17.2063 14.2676C16.3309 13.3922 15.8932 12.3292 15.8932 11.0786C15.8932 9.82803 16.3309 8.76504 17.2063 7.88963C18.0817 7.01423 19.1447 6.57652 20.3953 6.57652C21.6459 6.57652 22.7089 7.01423 23.5843 7.88963C24.4597 8.76504 24.8974 9.82803 24.8974 11.0786C24.8974 12.3292 24.4597 13.3922 23.5843 14.2676C22.7089 15.143 21.6459 15.5807 20.3953 15.5807ZM12.8918 24.5849C12.4666 24.5849 12.1105 24.4408 11.8233 24.1527C11.5362 23.8646 11.3921 23.5084 11.3911 23.0842V21.7336C11.3911 21.2083 11.5162 20.7081 11.7663 20.2329C12.0164 19.7577 12.3666 19.3825 12.8168 19.1073C13.9423 18.432 15.1369 17.9258 16.4005 17.5886C17.664 17.2515 18.9957 17.0824 20.3953 17.0814C21.795 17.0804 23.1271 17.2495 24.3917 17.5886C25.6563 17.9278 26.8503 18.434 27.9738 19.1073C28.424 19.3825 28.7742 19.7577 29.0243 20.2329C29.2744 20.7081 29.3995 21.2083 29.3995 21.7336V23.0842C29.3995 23.5094 29.2554 23.8661 28.9673 24.1542C28.6792 24.4423 28.323 24.5859 27.8988 24.5849H12.8918ZM11.3911 15.5807H2.38693C1.96174 15.5807 1.60557 15.4366 1.31844 15.1485C1.0313 14.8604 0.887236 14.5042 0.886236 14.08C0.885235 13.6558 1.0293 13.2996 1.31844 13.0115C1.60757 12.7234 1.96374 12.5793 2.38693 12.5793H11.3911C11.8163 12.5793 12.173 12.7234 12.4611 13.0115C12.7493 13.2996 12.8928 13.6558 12.8918 14.08C12.8908 14.5042 12.7468 14.8609 12.4596 15.15C12.1725 15.4391 11.8163 15.5827 11.3911 15.5807ZM17.3939 3.57513H2.38693C1.96174 3.57513 1.60557 3.43106 1.31844 3.14292C1.0313 2.85479 0.887236 2.49863 0.886236 2.07443C0.885235 1.65023 1.0293 1.29407 1.31844 1.00593C1.60757 0.717798 1.96374 0.57373 2.38693 0.57373H17.3939C17.8191 0.57373 18.1758 0.717798 18.4639 1.00593C18.752 1.29407 18.8956 1.65023 18.8946 2.07443C18.8936 2.49863 18.7495 2.85529 18.4624 3.14443C18.1753 3.43356 17.8191 3.57713 17.3939 3.57513ZM13.0419 9.57792H2.38693C1.96174 9.57792 1.60557 9.43385 1.31844 9.14572C1.0313 8.85758 0.887236 8.50142 0.886236 8.07722C0.885235 7.65302 1.0293 7.29686 1.31844 7.00872C1.60757 6.72059 1.96374 6.57652 2.38693 6.57652H14.3925C14.0424 7.00172 13.7612 7.46443 13.5491 7.96467C13.337 8.4649 13.1679 9.00265 13.0419 9.57792Z" fill="black" />
        </svg>
    },
    {
        "name": "Messages",
        "path": "/messages",
        "icon": <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.88623 3.97875C0.88623 3.07568 1.24497 2.2096 1.88354 1.57104C2.5221 0.932472 3.38818 0.57373 4.29125 0.57373H21.6259C22.529 0.57373 23.395 0.932472 24.0336 1.57104C24.6722 2.2096 25.0309 3.07568 25.0309 3.97875V16.3606C25.0309 17.2637 24.6722 18.1298 24.0336 18.7683C23.395 19.4069 22.529 19.7656 21.6259 19.7656H7.95752C7.48701 19.7656 7.0425 19.9799 6.74905 20.3476L3.86407 23.9544C2.876 25.1877 0.88623 24.4906 0.88623 22.9106V3.97875Z" fill="black" />
        </svg>
    },
    {
        "name": "Exercise",
        "path": "/exercise",
        "icon": <svg width="25" height="35" viewBox="0 0 25 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.1711 5.15124C17.1711 6.28783 16.7196 7.37787 15.9159 8.18156C15.1122 8.98525 14.0222 9.43676 12.8856 9.43676C11.749 9.43676 10.659 8.98525 9.8553 8.18156C9.05161 7.37787 8.6001 6.28783 8.6001 5.15124C8.6001 4.01465 9.05161 2.92461 9.8553 2.12092C10.659 1.31723 11.749 0.865723 12.8856 0.865723C14.0222 0.865723 15.1122 1.31723 15.9159 2.12092C16.7196 2.92461 17.1711 4.01465 17.1711 5.15124ZM18.8853 33.4356C18.8853 33.663 18.795 33.881 18.6343 34.0417C18.4736 34.2024 18.2556 34.2927 18.0282 34.2927H3.33406C2.80196 34.2927 2.28436 34.1193 1.85962 33.7988C1.43489 33.4783 1.12615 33.0281 0.980164 32.5165C0.834177 32.0048 0.85889 31.4595 1.05056 30.9631C1.24223 30.4667 1.59042 30.0463 2.0424 29.7655L6.57134 26.9525C6.94276 26.7218 7.24922 26.4002 7.46173 26.018C7.67424 25.6359 7.7858 25.2059 7.78585 24.7686V24.0075H9.82061C10.7298 24.0073 11.6017 23.646 12.2445 23.003L12.8856 22.3627L13.5259 23.003C13.8444 23.3216 14.2225 23.5743 14.6387 23.7466C15.0549 23.919 15.501 24.0076 15.9515 24.0075H18.0282V24.772C18.0284 25.208 18.1394 25.6368 18.3508 26.0181C18.5622 26.3993 18.8671 26.7206 19.2367 26.9517L23.7331 29.7621C24.1848 30.0441 24.5324 30.4655 24.7233 30.9626C24.9142 31.4597 24.938 32.0054 24.7912 32.5172C24.6444 33.0291 24.335 33.4792 23.9096 33.7995C23.4843 34.1199 22.9662 34.293 22.4337 34.2927H20.4538C20.5481 34.0245 20.5995 33.7356 20.5995 33.4356V33.2214C20.5994 32.5986 20.3733 31.997 19.9631 31.5283C19.553 31.0597 18.9867 30.7558 18.3694 30.6732L7.04274 29.1578C6.81925 29.1313 6.59428 29.1937 6.41642 29.3316C6.23856 29.4695 6.12208 29.6719 6.09214 29.895C6.06221 30.118 6.12121 30.3439 6.25641 30.5238C6.39162 30.7038 6.59217 30.8233 6.81475 30.8566L18.1422 32.372C18.3479 32.3996 18.5366 32.5009 18.6733 32.6571C18.81 32.8133 18.8853 33.0138 18.8853 33.2214V33.4356ZM14.7387 21.791L13.7427 20.7951V17.5878C13.8707 17.6615 13.989 17.7524 14.0976 17.8604L15.7081 19.4717C15.8689 19.6322 16.0869 19.7222 16.314 19.722H18.8853C19.0314 19.7219 19.175 19.6845 19.3025 19.6134C19.43 19.5422 19.5373 19.4396 19.614 19.3154C19.6908 19.1911 19.7345 19.0494 19.7411 18.9035C19.7477 18.7576 19.7169 18.6124 19.6516 18.4818L18.7945 16.7676C18.7463 16.6634 18.6778 16.5699 18.5928 16.4927C18.5079 16.4155 18.4083 16.3561 18.3 16.3182C18.1916 16.2802 18.0768 16.2644 17.9622 16.2716C17.8477 16.2789 17.7357 16.309 17.6331 16.3604C17.5304 16.4117 17.4391 16.4831 17.3646 16.5704C17.29 16.6577 17.2338 16.7591 17.1992 16.8686C17.1646 16.978 17.1523 17.0933 17.1631 17.2076C17.1739 17.3218 17.2075 17.4328 17.262 17.5338L17.4985 18.0078H16.6689L15.3095 16.6484C14.6666 16.0057 13.7947 15.6446 12.8856 15.6446C11.9765 15.6446 11.1047 16.0057 10.4617 16.6484L9.10236 18.0078H8.27269L8.50925 17.5338C8.56373 17.4328 8.59736 17.3218 8.60815 17.2076C8.61894 17.0933 8.60666 16.978 8.57205 16.8686C8.53744 16.7591 8.4812 16.6577 8.40666 16.5704C8.33213 16.4831 8.24082 16.4117 8.13815 16.3604C8.03548 16.309 7.92355 16.2789 7.80899 16.2716C7.69444 16.2644 7.57959 16.2802 7.47127 16.3182C7.36295 16.3561 7.26336 16.4155 7.17841 16.4927C7.09346 16.5699 7.02488 16.6634 6.97675 16.7676L6.11964 18.4818C6.05436 18.6124 6.02354 18.7576 6.03012 18.9035C6.03669 19.0494 6.08043 19.1911 6.15719 19.3154C6.23395 19.4396 6.34118 19.5422 6.46872 19.6134C6.59625 19.6845 6.73985 19.7219 6.88589 19.722H9.4572C9.6845 19.7219 9.90248 19.6316 10.0632 19.4709L11.6737 17.8604C11.7828 17.7524 11.9011 17.6615 12.0285 17.5878V20.7951L11.0326 21.791C10.7112 22.1125 10.2752 22.2932 9.82061 22.2933H4.64542C4.36667 22.2933 4.09213 22.2253 3.84558 22.0953C3.59903 21.9652 3.38791 21.777 3.23054 21.5469C3.07316 21.3168 2.97426 21.0519 2.94241 20.7749C2.91057 20.498 2.94674 20.2175 3.04779 19.9577L5.62252 13.3366C5.87293 12.6928 6.31199 12.1396 6.88216 11.7496C7.45233 11.3596 8.12701 11.151 8.8178 11.151H16.9534C17.6442 11.151 18.3189 11.3596 18.8891 11.7496C19.4592 12.1396 19.8983 12.6928 20.1487 13.3366L22.7243 19.9577C22.8254 20.2176 22.8616 20.4983 22.8296 20.7754C22.7977 21.0524 22.6986 21.3175 22.5411 21.5476C22.3835 21.7777 22.1721 21.9659 21.9254 22.0959C21.6786 22.2258 21.4038 22.2936 21.1249 22.2933H15.9498C15.4952 22.2932 15.0592 22.1125 14.7378 21.791" fill="black" />
        </svg>

    },
    {
        "name": "Staff",
        "path": "/staff",
        "icon": <svg width="25" height="35" viewBox="0 0 25 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.1711 5.15124C17.1711 6.28783 16.7196 7.37787 15.9159 8.18156C15.1122 8.98525 14.0222 9.43676 12.8856 9.43676C11.749 9.43676 10.659 8.98525 9.8553 8.18156C9.05161 7.37787 8.6001 6.28783 8.6001 5.15124C8.6001 4.01465 9.05161 2.92461 9.8553 2.12092C10.659 1.31723 11.749 0.865723 12.8856 0.865723C14.0222 0.865723 15.1122 1.31723 15.9159 2.12092C16.7196 2.92461 17.1711 4.01465 17.1711 5.15124ZM18.8853 33.4356C18.8853 33.663 18.795 33.881 18.6343 34.0417C18.4736 34.2024 18.2556 34.2927 18.0282 34.2927H3.33406C2.80196 34.2927 2.28436 34.1193 1.85962 33.7988C1.43489 33.4783 1.12615 33.0281 0.980164 32.5165C0.834177 32.0048 0.85889 31.4595 1.05056 30.9631C1.24223 30.4667 1.59042 30.0463 2.0424 29.7655L6.57134 26.9525C6.94276 26.7218 7.24922 26.4002 7.46173 26.018C7.67424 25.6359 7.7858 25.2059 7.78585 24.7686V24.0075H9.82061C10.7298 24.0073 11.6017 23.646 12.2445 23.003L12.8856 22.3627L13.5259 23.003C13.8444 23.3216 14.2225 23.5743 14.6387 23.7466C15.0549 23.919 15.501 24.0076 15.9515 24.0075H18.0282V24.772C18.0284 25.208 18.1394 25.6368 18.3508 26.0181C18.5622 26.3993 18.8671 26.7206 19.2367 26.9517L23.7331 29.7621C24.1848 30.0441 24.5324 30.4655 24.7233 30.9626C24.9142 31.4597 24.938 32.0054 24.7912 32.5172C24.6444 33.0291 24.335 33.4792 23.9096 33.7995C23.4843 34.1199 22.9662 34.293 22.4337 34.2927H20.4538C20.5481 34.0245 20.5995 33.7356 20.5995 33.4356V33.2214C20.5994 32.5986 20.3733 31.997 19.9631 31.5283C19.553 31.0597 18.9867 30.7558 18.3694 30.6732L7.04274 29.1578C6.81925 29.1313 6.59428 29.1937 6.41642 29.3316C6.23856 29.4695 6.12208 29.6719 6.09214 29.895C6.06221 30.118 6.12121 30.3439 6.25641 30.5238C6.39162 30.7038 6.59217 30.8233 6.81475 30.8566L18.1422 32.372C18.3479 32.3996 18.5366 32.5009 18.6733 32.6571C18.81 32.8133 18.8853 33.0138 18.8853 33.2214V33.4356ZM14.7387 21.791L13.7427 20.7951V17.5878C13.8707 17.6615 13.989 17.7524 14.0976 17.8604L15.7081 19.4717C15.8689 19.6322 16.0869 19.7222 16.314 19.722H18.8853C19.0314 19.7219 19.175 19.6845 19.3025 19.6134C19.43 19.5422 19.5373 19.4396 19.614 19.3154C19.6908 19.1911 19.7345 19.0494 19.7411 18.9035C19.7477 18.7576 19.7169 18.6124 19.6516 18.4818L18.7945 16.7676C18.7463 16.6634 18.6778 16.5699 18.5928 16.4927C18.5079 16.4155 18.4083 16.3561 18.3 16.3182C18.1916 16.2802 18.0768 16.2644 17.9622 16.2716C17.8477 16.2789 17.7357 16.309 17.6331 16.3604C17.5304 16.4117 17.4391 16.4831 17.3646 16.5704C17.29 16.6577 17.2338 16.7591 17.1992 16.8686C17.1646 16.978 17.1523 17.0933 17.1631 17.2076C17.1739 17.3218 17.2075 17.4328 17.262 17.5338L17.4985 18.0078H16.6689L15.3095 16.6484C14.6666 16.0057 13.7947 15.6446 12.8856 15.6446C11.9765 15.6446 11.1047 16.0057 10.4617 16.6484L9.10236 18.0078H8.27269L8.50925 17.5338C8.56373 17.4328 8.59736 17.3218 8.60815 17.2076C8.61894 17.0933 8.60666 16.978 8.57205 16.8686C8.53744 16.7591 8.4812 16.6577 8.40666 16.5704C8.33213 16.4831 8.24082 16.4117 8.13815 16.3604C8.03548 16.309 7.92355 16.2789 7.80899 16.2716C7.69444 16.2644 7.57959 16.2802 7.47127 16.3182C7.36295 16.3561 7.26336 16.4155 7.17841 16.4927C7.09346 16.5699 7.02488 16.6634 6.97675 16.7676L6.11964 18.4818C6.05436 18.6124 6.02354 18.7576 6.03012 18.9035C6.03669 19.0494 6.08043 19.1911 6.15719 19.3154C6.23395 19.4396 6.34118 19.5422 6.46872 19.6134C6.59625 19.6845 6.73985 19.7219 6.88589 19.722H9.4572C9.6845 19.7219 9.90248 19.6316 10.0632 19.4709L11.6737 17.8604C11.7828 17.7524 11.9011 17.6615 12.0285 17.5878V20.7951L11.0326 21.791C10.7112 22.1125 10.2752 22.2932 9.82061 22.2933H4.64542C4.36667 22.2933 4.09213 22.2253 3.84558 22.0953C3.59903 21.9652 3.38791 21.777 3.23054 21.5469C3.07316 21.3168 2.97426 21.0519 2.94241 20.7749C2.91057 20.498 2.94674 20.2175 3.04779 19.9577L5.62252 13.3366C5.87293 12.6928 6.31199 12.1396 6.88216 11.7496C7.45233 11.3596 8.12701 11.151 8.8178 11.151H16.9534C17.6442 11.151 18.3189 11.3596 18.8891 11.7496C19.4592 12.1396 19.8983 12.6928 20.1487 13.3366L22.7243 19.9577C22.8254 20.2176 22.8616 20.4983 22.8296 20.7754C22.7977 21.0524 22.6986 21.3175 22.5411 21.5476C22.3835 21.7777 22.1721 21.9659 21.9254 22.0959C21.6786 22.2258 21.4038 22.2936 21.1249 22.2933H15.9498C15.4952 22.2932 15.0592 22.1125 14.7378 21.791" fill="black" />
        </svg>

    },
    {
        "name": "Setting",
        "path": "/settings",
        "icon": <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5426 3.97131C16.0869 4.13939 16.6071 4.35549 17.1034 4.61961L19.304 3.299C19.5335 3.16137 19.8023 3.10434 20.0679 3.13697C20.3335 3.16959 20.5806 3.29 20.7699 3.47908L21.992 4.70125C22.1811 4.89058 22.3015 5.13765 22.3342 5.40322C22.3668 5.6688 22.3098 5.93767 22.1721 6.16713L20.8515 8.36776C21.1156 8.86399 21.3317 9.38423 21.4998 9.92848L23.9886 10.5516C24.2482 10.6166 24.4786 10.7665 24.6433 10.9775C24.808 11.1885 24.8974 11.4485 24.8974 11.7161V13.4425C24.8974 13.7102 24.808 13.9701 24.6433 14.1811C24.4786 14.3921 24.2482 14.542 23.9886 14.6071L21.4998 15.2301C21.3317 15.7744 21.1156 16.2946 20.8515 16.7909L22.1721 18.9915C22.3098 19.221 22.3668 19.4898 22.3342 19.7554C22.3015 20.021 22.1811 20.2681 21.992 20.4574L20.7699 21.6795C20.5806 21.8686 20.3335 21.989 20.0679 22.0217C19.8023 22.0543 19.5335 21.9973 19.304 21.8596L17.1034 20.539C16.6071 20.8031 16.0869 21.0192 15.5426 21.1873L14.9196 23.6761C14.8545 23.9357 14.7046 24.1661 14.4936 24.3308C14.2826 24.4955 14.0227 24.5849 13.755 24.5849H12.0286C11.761 24.5849 11.501 24.4955 11.29 24.3308C11.079 24.1661 10.9291 23.9357 10.8641 23.6761L10.241 21.1873C9.70156 21.0206 9.17902 20.8036 8.68026 20.539L6.47963 21.8596C6.25017 21.9973 5.9813 22.0543 5.71572 22.0217C5.45015 21.989 5.20308 21.8686 5.01375 21.6795L3.79158 20.4574C3.6025 20.2681 3.48209 20.021 3.44947 19.7554C3.41684 19.4898 3.47387 19.221 3.6115 18.9915L4.93211 16.7909C4.66756 16.2921 4.4505 15.7696 4.28381 15.2301L1.79505 14.6071C1.53564 14.5421 1.30534 14.3923 1.1407 14.1816C0.976065 13.9708 0.886505 13.7112 0.88623 13.4437V11.7173C0.886238 11.4497 0.975675 11.1897 1.14034 10.9787C1.305 10.7677 1.53544 10.6178 1.79505 10.5528L4.28381 9.92968C4.45189 9.38543 4.66799 8.86519 4.93211 8.36896L3.6115 6.16833C3.47387 5.93887 3.41684 5.67 3.44947 5.40442C3.48209 5.13885 3.6025 4.89178 3.79158 4.70245L5.01375 3.47908C5.20308 3.29 5.45015 3.16959 5.71572 3.13697C5.9813 3.10434 6.25017 3.16137 6.47963 3.299L8.68026 4.61961C9.17649 4.35549 9.69673 4.13939 10.241 3.97131L10.8641 1.48255C10.9291 1.22314 11.0788 0.992844 11.2895 0.828204C11.5003 0.663565 11.76 0.574005 12.0274 0.57373H13.7538C14.0215 0.573738 14.2814 0.663175 14.4924 0.827835C14.7034 0.992496 14.8533 1.22294 14.9184 1.48255L15.5426 3.97131ZM12.8918 17.3815C14.1654 17.3815 15.3869 16.8756 16.2875 15.975C17.1881 15.0744 17.694 13.8529 17.694 12.5793C17.694 11.3057 17.1881 10.0842 16.2875 9.18362C15.3869 8.28303 14.1654 7.77708 12.8918 7.77708C11.6182 7.77708 10.3967 8.28303 9.49612 9.18362C8.59553 10.0842 8.08958 11.3057 8.08958 12.5793C8.08958 13.8529 8.59553 15.0744 9.49612 15.975C10.3967 16.8756 11.6182 17.3815 12.8918 17.3815Z" fill="black" />
        </svg>
    },

];

