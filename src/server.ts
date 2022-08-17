import express, {
  Application,
  urlencoded,
  Request,
  Response,
  NextFunction,
} from "express";
import { addUserValidator } from "./validators/user.validator";

const app: Application = express();
const PORT = 4001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(urlencoded({ extended: false }));

app.post(
  "/api/user/register",
  addUserValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json(req.body);
  }
);
app.listen(PORT, async () => {
  console.log(`Server started Listening in port: ${PORT}`);
});
