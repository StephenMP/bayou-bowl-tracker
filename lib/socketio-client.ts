export async function publishMessage(event: string, message: any) {
    await fetch(`/api/publish/${event}`, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
            "Content-Type": "application/json"
        },
    })
}

export async function publishJson(event: string, json: string) {
    await fetch(`/api/publish/${event}`, {
        method: 'POST',
        body: json,
        headers: {
            "Content-Type": "application/json"
        },
    })
}