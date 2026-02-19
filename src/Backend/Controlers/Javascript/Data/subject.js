import axios, {} from "axios";
import {} from 'express';
import handleError from "../Global/Method/error.js";
import 'express';
import { error } from "console";
class Subject {
    static async SubjectCount() {
        try {
            const response = await this.api.get("");
            const Count = {};
            const Items = response.data?._embedded?.values ?? [];
            const normalize = (text) => text
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");
            Items.forEach((item) => {
                const key = normalize(item.label);
                Count[key] = (Count[key] ?? 0) + item.count;
            });
            const sorted = Object.entries(Count)
                .sort((a, b) => a[1] - b[1]) // crescente
                .map(([name, value]) => ({ name, value }));
            return {
                Message: "Query successfully",
                data: sorted,
                Status: 200,
                Sucess: true,
            };
        }
        catch (error) {
            return handleError(error);
        }
    }
    static async SubjectCountRoute(req, res) {
        const CountResponse = await Subject.SubjectCount();
        return res.status(CountResponse.Status).json(CountResponse);
    }
}
Subject.api = axios.create({
    baseURL: "https://api.treinamento.saudeindigena.icict.fiocruz.br/api/discover/facets/subject"
});
export default Subject;
//# sourceMappingURL=subject.js.map