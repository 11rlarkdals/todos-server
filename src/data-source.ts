import { DataSource } from "typeorm";
import { User } from "./entites/user";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "rkrkfmfm",
  password: "rkrkfmfm",
  database: "todos",
  synchronize: true,
  logging: false,
  entities: [User], // 엔티티를 추가합니다.
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
