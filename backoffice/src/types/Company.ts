export interface Company {
    isVerified: boolean,
    onboardingStatus: string,
    panCard: string;
    alternateNumber: string;
    orderId: string;
    profileFormFilled: boolean;
    industryType: string;
    aboutCompany: string;
    profilePicture: string;
    userName: string;
    promo: string;
    referralCode: string;
    district: string;
    contactNumber: string;
    foundedYear: string;
    email: string;
    detailsFormFilled: boolean;
    organizationName: string;
    country: string;
    userId: string;
    alternateContact: string;
    galleryImages: string[];
    state: string;
    applicationFormCompleted: boolean;
    pinCode: string;
    accountType: string;
    fullName: string;
    companyMission: string;
    headquarter: string;
    subDomain: string;
    paymentId: string;
    registrationNumber: string;
    website: string;
    registrationCertificate: string;
    news: {
        newsTitle: string;
        refLink: string;
    }[];
    paymentStatus: boolean;
    services: {
        serviceName: string;
    }[];
    fullAddress: string;
}
