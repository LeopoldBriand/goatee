FROM busybox:1.35.0-uclibc as busybox

FROM surrealdb/surrealdb:1.0.0-beta.8
COPY --from=busybox /bin/sh /bin/sh
COPY --from=busybox /bin/mkdir /bin/mkdir
COPY --from=busybox /bin/cat /bin/cat
COPY --from=busybox /bin/chmod /bin/chmod
ENTRYPOINT /surreal start --log debug --user $DB_USER --pass $DB_PASSWORD memory