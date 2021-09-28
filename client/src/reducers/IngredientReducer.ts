import { GET_FILTER_DATA } from "actions/IngredientAction";
import { IngredientGoodAndBadData } from "types";

interface Action {
  type: string;
  payload: string;
}

const initialState: IngredientGoodAndBadData = {
  badData: [
    {
      id: 1,
      name: "대파",
      image:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MjlfMTU5/MDAxNTkzMzkzNjk0Mzc5.kaXpjMFhZAn4LU-jJCk9HX5L36uur08I6RFmeGJwB6cg.qa_WaeL3MV8oWnTsB10JFzwnj3e4zYpG4PKKiLs68Mkg.JPEG.artforlove/4.jpg?type=w800",
    },
    {
      id: 2,
      name: "마늘",
      image: "https://en.pimg.jp/053/854/090/1/53854090.jpg",
    },
    {
      id: 3,
      name: "두부",
      image: "https://kuku-keke.com/wp-content/uploads/2020/03/1956_3.png",
    },
    {
      id: 4,
      name: "김치",
      image:
        "https://media.istockphoto.com/vectors/kimchi-of-korea-vector-id627008966?k=20&m=627008966&s=170667a&w=0&h=RGPrcD23fG3LGhGYgWa8R6NTQYToxvBbk82WhD85F6A=",
    },
    {
      id: 5,
      name: "돼지고기",
      image:
        "https://resource.grapplet.com/marketplace/8288/1600182142979/beef6.svg.preview.580x870.png",
    },
    {
      id: 6,
      name: "닭고기",
      image: "https://i.ytimg.com/vi/aiGUYBULfD8/hqdefault.jpg",
    },
    {
      id: 7,
      name: "소고기",
      image:
        "https://resource.grapplet.com/marketplace/8265/1600185955735/beef1.svg.preview.580x870.png",
    },
    {
      id: 8,
      name: "밀가루",
      image:
        "https://img.freepik.com/free-vector/canvas-bag-with-white-flour-scoop-ears_23965-525.jpg?size=338&ext=jpg",
    },
    {
      id: 9,
      name: "소금",
      image:
        "https://us.123rf.com/450wm/bsd555/bsd5551806/bsd555180601134/103508441-%EC%86%8C%EA%B8%88-%EB%98%90%EB%8A%94-%ED%9B%84%EC%B6%94-%ED%86%B5-%EC%83%89%EC%83%81-%EC%95%84%EC%9D%B4%EC%BD%98-%EA%B8%B0%EB%AF%B8-%EA%B2%A9%EB%A6%AC-%EB%90%9C-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?ver=6",
    },
    {
      id: 10,
      name: "설탕",
      image: "https://preview.clipartkorea.co.kr/2017/03/15/psxtg228685.jpg",
    },
    {
      id: 11,
      name: "간장",
      image:
        "https://data.ac-illust.com/data/thumbnails/c0/c070eda4fc676f3b9f70e4208b05082a_t.jpeg",
    },
    {
      id: 12,
      name: "된장",
      image:
        "https://media.istockphoto.com/vectors/miso-vector-id1200905518?k=20&m=1200905518&s=612x612&w=0&h=cAAwu9ZnTPUj_0QWZCKFwORHp3DjOBRbc4GJyUq_Vk4=",
    },
    {
      id: 13,
      name: "고추장",
      image:
        "https://www.urbanbrush.net/web/wp-content/uploads/edd/2018/01/web-20180131040439630685.png",
    },
    {
      id: 14,
      name: "고춧가루",
      image:
        "https://previews.123rf.com/images/jumpingxiii/jumpingxiii1810/jumpingxiii181000106/111072109-chilli-powder-cartoon-vector-.jpg",
    },
    {
      id: 15,
      name: "식용유",
      image:
        "https://previews.123rf.com/images/nordfox/nordfox1604/nordfox160400042/54932323-cooking-oil-bottle-baking-and-cooking-ingredient-cartoon-vector-cooking-oil-food-fat-bottle-cooking-.jpg",
    },
    {
      id: 16,
      name: "라면",
      image:
        "https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/11/urbanbrush-20191127124241477490.jpg",
    },
  ],
  goodData: [
    {
      name: "대파",
      image:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MjlfMTU5/MDAxNTkzMzkzNjk0Mzc5.kaXpjMFhZAn4LU-jJCk9HX5L36uur08I6RFmeGJwB6cg.qa_WaeL3MV8oWnTsB10JFzwnj3e4zYpG4PKKiLs68Mkg.JPEG.artforlove/4.jpg?type=w800",
    },
    {
      name: "마늘",
      image: "https://en.pimg.jp/053/854/090/1/53854090.jpg",
    },
    {
      name: "두부",
      image: "https://kuku-keke.com/wp-content/uploads/2020/03/1956_3.png",
    },
    {
      name: "김치",
      image:
        "https://media.istockphoto.com/vectors/kimchi-of-korea-vector-id627008966?k=20&m=627008966&s=170667a&w=0&h=RGPrcD23fG3LGhGYgWa8R6NTQYToxvBbk82WhD85F6A=",
    },
    {
      name: "돼지고기",
      image:
        "https://resource.grapplet.com/marketplace/8288/1600182142979/beef6.svg.preview.580x870.png",
    },
    {
      name: "닭고기",
      image: "https://i.ytimg.com/vi/aiGUYBULfD8/hqdefault.jpg",
    },
    {
      name: "소고기",
      image:
        "https://resource.grapplet.com/marketplace/8265/1600185955735/beef1.svg.preview.580x870.png",
    },
    {
      name: "밀가루",
      image:
        "https://img.freepik.com/free-vector/canvas-bag-with-white-flour-scoop-ears_23965-525.jpg?size=338&ext=jpg",
    },
    {
      name: "소금",
      image:
        "https://us.123rf.com/450wm/bsd555/bsd5551806/bsd555180601134/103508441-%EC%86%8C%EA%B8%88-%EB%98%90%EB%8A%94-%ED%9B%84%EC%B6%94-%ED%86%B5-%EC%83%89%EC%83%81-%EC%95%84%EC%9D%B4%EC%BD%98-%EA%B8%B0%EB%AF%B8-%EA%B2%A9%EB%A6%AC-%EB%90%9C-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?ver=6",
    },
    {
      name: "설탕",
      image: "https://preview.clipartkorea.co.kr/2017/03/15/psxtg228685.jpg",
    },
    {
      name: "간장",
      image:
        "https://data.ac-illust.com/data/thumbnails/c0/c070eda4fc676f3b9f70e4208b05082a_t.jpeg",
    },
    {
      name: "된장",
      image:
        "https://media.istockphoto.com/vectors/miso-vector-id1200905518?k=20&m=1200905518&s=612x612&w=0&h=cAAwu9ZnTPUj_0QWZCKFwORHp3DjOBRbc4GJyUq_Vk4=",
    },
    {
      name: "고추장",
      image:
        "https://www.urbanbrush.net/web/wp-content/uploads/edd/2018/01/web-20180131040439630685.png",
    },
    {
      name: "고춧가루",
      image:
        "https://previews.123rf.com/images/jumpingxiii/jumpingxiii1810/jumpingxiii181000106/111072109-chilli-powder-cartoon-vector-.jpg",
    },
    {
      name: "식용유",
      image:
        "https://previews.123rf.com/images/nordfox/nordfox1604/nordfox160400042/54932323-cooking-oil-bottle-baking-and-cooking-ingredient-cartoon-vector-cooking-oil-food-fat-bottle-cooking-.jpg",
    },
    {
      name: "라면",
      image:
        "https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/11/urbanbrush-20191127124241477490.jpg",
    },
    {
      name: "대파",
      image:
        "https://mblogthumb-phinf.pstatic.net/MjAyMDA2MjlfMTU5/MDAxNTkzMzkzNjk0Mzc5.kaXpjMFhZAn4LU-jJCk9HX5L36uur08I6RFmeGJwB6cg.qa_WaeL3MV8oWnTsB10JFzwnj3e4zYpG4PKKiLs68Mkg.JPEG.artforlove/4.jpg?type=w800",
    },
    {
      name: "마늘",
      image: "https://en.pimg.jp/053/854/090/1/53854090.jpg",
    },
    {
      name: "두부",
      image: "https://kuku-keke.com/wp-content/uploads/2020/03/1956_3.png",
    },
    {
      name: "김치",
      image:
        "https://media.istockphoto.com/vectors/kimchi-of-korea-vector-id627008966?k=20&m=627008966&s=170667a&w=0&h=RGPrcD23fG3LGhGYgWa8R6NTQYToxvBbk82WhD85F6A=",
    },
    {
      name: "돼지고기",
      image:
        "https://resource.grapplet.com/marketplace/8288/1600182142979/beef6.svg.preview.580x870.png",
    },
    {
      name: "닭고기",
      image: "https://i.ytimg.com/vi/aiGUYBULfD8/hqdefault.jpg",
    },
    {
      name: "소고기",
      image:
        "https://resource.grapplet.com/marketplace/8265/1600185955735/beef1.svg.preview.580x870.png",
    },
    {
      name: "밀가루",
      image:
        "https://img.freepik.com/free-vector/canvas-bag-with-white-flour-scoop-ears_23965-525.jpg?size=338&ext=jpg",
    },
    {
      name: "소금",
      image:
        "https://us.123rf.com/450wm/bsd555/bsd5551806/bsd555180601134/103508441-%EC%86%8C%EA%B8%88-%EB%98%90%EB%8A%94-%ED%9B%84%EC%B6%94-%ED%86%B5-%EC%83%89%EC%83%81-%EC%95%84%EC%9D%B4%EC%BD%98-%EA%B8%B0%EB%AF%B8-%EA%B2%A9%EB%A6%AC-%EB%90%9C-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg?ver=6",
    },
    {
      name: "설탕",
      image: "https://preview.clipartkorea.co.kr/2017/03/15/psxtg228685.jpg",
    },
    {
      name: "간장",
      image:
        "https://data.ac-illust.com/data/thumbnails/c0/c070eda4fc676f3b9f70e4208b05082a_t.jpeg",
    },
    {
      name: "된장",
      image:
        "https://media.istockphoto.com/vectors/miso-vector-id1200905518?k=20&m=1200905518&s=612x612&w=0&h=cAAwu9ZnTPUj_0QWZCKFwORHp3DjOBRbc4GJyUq_Vk4=",
    },
    {
      name: "고추장",
      image:
        "https://www.urbanbrush.net/web/wp-content/uploads/edd/2018/01/web-20180131040439630685.png",
    },
    {
      name: "고춧가루",
      image:
        "https://previews.123rf.com/images/jumpingxiii/jumpingxiii1810/jumpingxiii181000106/111072109-chilli-powder-cartoon-vector-.jpg",
    },
    {
      name: "식용유",
      image:
        "https://previews.123rf.com/images/nordfox/nordfox1604/nordfox160400042/54932323-cooking-oil-bottle-baking-and-cooking-ingredient-cartoon-vector-cooking-oil-food-fat-bottle-cooking-.jpg",
    },
    {
      name: "라면",
      image:
        "https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/11/urbanbrush-20191127124241477490.jpg",
    },
  ],
};

const IngredientReducer = (
  state: IngredientGoodAndBadData = initialState,
  action: Action
) => {
  switch (action.type) {
    case GET_FILTER_DATA:
      state.goodData = initialState.goodData.filter((item) =>
        item.name.includes(action.payload ? action.payload : "")
      );
      return {
        ...state,
      };
    default:
      return { ...state };
  }
};

export default IngredientReducer;
