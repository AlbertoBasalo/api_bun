# 🥖 API bun

> [!NOTE]
> An API server for rapid prototyping, testing, workshops...
>
> Delicious JSON fast food ready to consume.
>
> This project was cooked using [_bun_](https://bun.sh) v1.1.3.

- 🥖 Just-in-memory or file-based
- 🥖 Open or secured
- 🥖 For rapid prototypes
- 🥖 For front end testing
- 🥖 For educational purposes

## 1 🍳 Ready for ~~lunch~~ launch

```bash
# ⬇️ clone the repo
git clone https://github.com/AlbertoBasalo/api_bun.git
cd api_bun
```

### 1.1 🧑‍🍳 - If you have already _bun_ in your system

```bash
# 🥖 want to taste this!
bun run start
# 🧑‍🍳 To cook in dev mode:
# install the tools...
bun i
# and then run-watching changes.
bun run dev
```

### 1.2 🍽️ - If not a _bun_ user, then fallback to npm

> [!TIP]
>
> _Bun_ installation is easy and highly recommended.
>
> https://bun.sh/docs/cli/install

```bash
# 🥖 want to taste this!
# install local bun...
npm run bun:i
# and then start the API server with npm
npm start
```

## 2 🧂 Tasty environment configuration

API-bun is configurable through the command line, `.env` file, or code defaults. To get an idea of your flavors, see configuration types and the .env sample below.

```ts
export type ApiBunConfig = {
  /** Log level (info,none,verbose) */
  LOG_LEVEL: LogLevels;
  /** Storage type (memory,file) */
  STORAGE: StorageTypes;
  /** Security type (none,write) */
  SECURITY: SecurityTypes;
  /** Secret */
  SECRET: string;
};
```

> [!TIP]
> Sample `.env` with default values
>
> Create it outside the `src` folder. It will be ignored by git.

```txt
STORAGE=memory
LOG_LEVEL=info
SECURITY=none
SECRET=secret
```

## 3 🥡 Storage

### 3.1 🍱 In Memory

By default, the API-bun uses an in-memory storage system for rapid prototyping and testing. This means that all data is lost when the server stops. Useful for clean starts.

If you want to feed the system with some seed data, just create a file named `db/{collection_name}.json` with an array of objects. Api-bun will load it automatically and serve it fresh without touching nothing.

As any usable example, you can find :
- a `db/activities.json` file with a list of recreational activities. 
- a `db/categories.json` file with a list of categories for an store.
- a `db/products.json` file with a list of products for an store.

Also you can taste flavors of the world by using the amazing [countries-states-cities-database](https://github.com/dr5hn/countries-states-cities-database) files.

### 3.2 🍲 File System

If you want to persist changes between server restarts, then configure the `.env` file with `STORAGE=file`. This will save all changes to the file system in the `db` folder. Useful for after test analysis or to run in a more realistic scenario.

## 4 🍵 Security

### 4.1 🍩 None

The default security level is `none`. This means that the API-bun will not require any token to access the resources. Again, this is useful for rapid prototyping and testing, the main goal of this project.

### 4.2 🍪 Signed Token for write

If you want to add a minimal security layer, then configure the `.env` file with `SECURITY=write`. This will require a signed token to access the resources. The token is generated with the `SECRET` value in the `.env` file.

When enabled, any `POST, PUT, PATCH or DELETE` request to the API must include the token in the `Authorization` header with the `Bearer` prefix.

The identified user `id` is also added to any posted item as `userId` property as an owner for future fine grained security.

> [!CAUTION]
> The token is not JWT compliant and is only a minimal security layer.

#### To register a new user

```bash
curl -X POST http://localhost:3000/api/register -d '{"email":"admin@world.org","password":"1234"}' -H "Content-Type: application/json"
```

#### To login

```bash
curl -X POST http://localhost:3000/api/login -d '{"email":"admin@world.org","password":"1234"}' -H "Content-Type: application/json"
```

## 5 🍔 Forced responses

When testing your app, sometimes you want to force the API to return a specific response. This can be done by adding some query parameter to the request.

### 5.1 🍟 Forced status codes

To force a specific status code, add the `status` query parameter to the request.

```bash
curl -X GET http://localhost:3000/api/activities?status=404
```

### 5.2 🍕 Forced dela

To force a delay in the response, add the `delay` query parameter to the request. The value is in milliseconds.

```bash
curl -X GET http://localhost:3000/api/activities?delay=5000
```

## X 🥪 Hot features and cold road-map

- [x] Publishes a generic CRUD API
- [x] Endpoint routes in the form `http://localhost:3000/api/{collection_name}` for GET all or POST.
- [x] Add the _id_ `http://localhost:3000/api/{collection_name}/{id}` for GET one, PUT or DELETE.
- [x] Add _queryParams_ `http://localhost:3000/api/{collection_name}?key={key}&value={value}` for GET by key/value.
- [x] Always try to feeds any resource with seed data from `db/{collection_name}.json`.
- [x] If no file found, then starts with an empty array.
- [x] Uses _id_ as a primary key to identify items.
- [x] If not supplied during POST, then generates a new random _id_.
- [x] Configuration with `.env` file or command line (see below).
- [x] If configured with `STORAGE=file`, then persist changes (POST,PUT, DELETE) to file system.
- [x] PUT works like a PATCH, only updating the fields supplied.
- [x] Logs to console with different levels (_info, none, verbose_).
- [x] Minimal security with signed token (not JWT compliant).
- [ ] _JWT Security and authorization_
- [ ] _Sorted results_
- [ ] _Pagination_
- [ ] _Put and patch distinction_
- [ ] _Allow to configure the root api route_
- [ ] _Allow to configure the primary key property name_
- [ ] _Allow to configure the storage path_
- [ ] _Published to npm_

---

> [!CAUTION]
> Not suitable for production use. Use only for rapid prototyping, testing, workshops...

---

<footer>
  <h3>🧑🏼‍💻 By <a href="https://albertobasalo.dev" target="blank">Alberto Basalo</a> </h3>
  <p>
    <a href="https://twitter.com/albertobasalo" target="blank">
      <img src="https://img.shields.io/twitter/follow/albertobasalo?logo=twitter&style=for-the-badge" alt="twitter albertobasalo" />
    </a>
  </p>
  <p>
    <a href="https://github.com/albertobasalo" target="blank">
      <img 
        src="https://img.shields.io/github/followers/albertobasalo?logo=github&label=profile albertobasalo&style=for-the-badge" alt="git albertobasalo" />
    </a>
  </p>
</footer>
