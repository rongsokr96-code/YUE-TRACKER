const CACHE_NAME = "yue-atlas-v1";

self.addEventListener("install", (event) => {
self.skipWaiting();
});

self.addEventListener("activate", (event) => {
event.waitUntil(self.clients.claim());
});

self.addEventListener("message", (event) => {
if (event.data && event.data.type === "TEST_NOTIFICATION") {
event.waitUntil(
self.registration.showNotification("YUE ATLAS", {
body: "Notifikasi berhasil diaktifkan!",
icon: "/favicon.ico",
tag: "yue-atlas-test",
data: { url: "/" }
})
);
}
});

self.addEventListener("notificationclick", (event) => {
event.notification.close();

event.waitUntil(
self.clients.matchAll({
type: "window",
includeUncontrolled: true
}).then((clients) => {
for (const client of clients) {
if ("focus" in client) {
return client.focus();
}
}

  return self.clients.openWindow("/");
})

);
});
