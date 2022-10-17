import { $host } from "../../api/index";
import { deviceAPI } from "../../api/deviceAPI";

describe("get device test", () => {

  let mockGet: jest.SpyInstance;

  beforeEach(() => {
    mockGet = jest.spyOn($host, 'get');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should to be called 1 times and response result", async () => {

    const result = {
      status: 200,
      data: {
        id: 0,
        name: "",
        price: 0,
        rating: 0,
        img: "",
        brandId: 0,
        typeId: 0,
        info: [],
      }
    };

    mockGet.mockImplementation(() => Promise.resolve(result));

    await deviceAPI.getOneDevice('1')

    expect(mockGet).toHaveBeenCalledTimes(1);
    const mockResult = await mockGet.mock.results[0].value;
    expect(mockResult).toStrictEqual(result);
  });
})


// describe("Device page", () => {
//   it("card should be in the document", () => {
//     render(<DevicePage />)
//     const linkElement = screen.getByTestId("card")
//     expect(linkElement).toBeInTheDocument()
//   })

//   it("price should not be in the document", () => {
//     render(<DevicePage />)
//     const linkElement = screen.queryByTitle(/Price: 1200/i)
//     expect(linkElement).toBeNull()
//   })
// })
