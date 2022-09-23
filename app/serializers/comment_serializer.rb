# frozen_string_literal: true

class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :commentable_type, :comment_replies

  def comment_replies
    object.comment_replies.map do |reply|
      CommentReplySerializer.new(reply)
    end
  end
end
