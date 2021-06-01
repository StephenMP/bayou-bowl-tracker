export async function publishEvent<TEvent>(event: string, message: TEvent) {
    await fetch(`/api/publish/${event}`, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
            "Content-Type": "application/json"
        },
    })
}

export async function publishEventAsJson(event: string, json: string) {
    await fetch(`/api/publish/${event}`, {
        method: 'POST',
        body: json,
        headers: {
            "Content-Type": "application/json"
        },
    })
}
