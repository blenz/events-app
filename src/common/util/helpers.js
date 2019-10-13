export const createNewEvent = (user, photoURL, event) => {
    return {
        ...event,
        hostUid: user.uid,
        hostedBy: user.displayName,
        hostPhotoURL: photoURL || '/assetts/user.png',
        created: new Date(),
        attendees: {
            [user.uid]: {
                going: true,
                joinDate: new Date(),
                photoURL: photoURL || '/assetts/user.png',
                displayName: user.displayName,
                host: true
            }
        }
    }
}