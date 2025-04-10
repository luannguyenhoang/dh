import "server-only";

import { clean } from "@/lib/sanitizeHtml";
import styles from "@/styles/Post.module.css";
import { formatDate } from "@/ultil/date";
import dynamic from "next/dynamic";
import Link from "next/link";
import { SamePosts } from "./Sames";

const Share = dynamic(() =>
  import("@/features/post/Share").then((mod) => mod.Share)
);

export const Post = ({ post }: { post: any }) => {
  const categories = post?.categories || [];

  return (
    <article className={styles["post"]}>
      <div className={styles["post--share"]}>
        <Share url={post?.slug || "#"} />
      </div>
      <main>
      

        {!post && (
          <div className={styles["not-found"]}>
            <p>Bài viết này không tồn tại !</p>
            <Link className={styles["back-new"]} href={"/tin-tuc"}>
              Trở về trang tin tức
            </Link>
          </div>
        )}
      </main>
    </article>
  );
};
